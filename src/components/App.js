import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';

const App = _ => {
  //Задаем состояния компонента
  const [isEditProfilePopupOpen, setProfileStatus] = useState(false);
  const [isAddPlacePopupOpen, setPlaceStatus] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarStatus] = useState(false);
  const [isConfirmPopupOpen, setConfirmStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentCardId, setCurrentCardId] = useState('');
  const [cards, setCards] = useState([]);

  //Берем данные профайла для контекста
  useEffect(_ => {
    api
      .getProfileInformation()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(err));
  }, []);

  //Запрос к API для получения карточек
  useEffect(_ => {
    const getCards = api.getInitialCards('cards');
    getCards
      .then(dataCard => {
        setCards(dataCard);
      })
      .catch(err => console.log(err));
  }, []);

  //Изменения состояния для закрытия попапов
  const closeAllPopups = _ => {
    setAvatarStatus(false);
    setPlaceStatus(false);
    setProfileStatus(false);
    setSelectedCard(false);
    setConfirmStatus(false);
  };

  //Функция для открытия увеличенной карточки по клику
  const handleCardClick = ({ link, name }) => {
    setSelectedCard({ status: true, src: link, name: name });
  };

  //Проверяем лайки, меняем статус запросом к api и создаем новый массив карточек в стейт
  const handleCardLike = ({ likes, idCard }) => {
    const isLiked = likes.some(like => like._id === currentUser._id);
    api
      .changeLikeCardStatus(idCard, !isLiked)
      .then(newCard => {
        const newCards = cards.map(singleCard =>
          singleCard._id === idCard ? newCard : singleCard
        );
        setCards(newCards);
      })
      .catch(err => console.log(err));
  };

  //Удаление карточки запрос к api и обновление стейта
  const handleCardDelete = evt => {
    evt.preventDefault();
    api
      .removeCard(currentCardId)
      .then(_ => {
        const newCardList = cards.filter(card => currentCardId !== card._id);
        setCards(newCardList);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  //Запрос к Api для изменения аватара
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateUserAvatar({ avatar })
      .then(UserData => {
        setCurrentUser(UserData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  //Запрос к api для изменения профайла
  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUserInformation({ name, about })
      .then(UserData => {
        setCurrentUser(UserData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  //Запрос к api для добавления карточки
  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  //Функции изменения состояния для открытия попапов
  const handleEditAvatarClick = _ => {
    setAvatarStatus(true);
  };
  const handleEditProfileClick = _ => {
    setProfileStatus(true);
  };
  const handleAddPlaceClick = _ => {
    setPlaceStatus(true);
  };
  const handleConfirmClick = cardId => {
    setCurrentCardId(cardId);
    setConfirmStatus(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardsLike={handleCardLike}
            onCardsDelete={handleConfirmClick}
            cards={cards}
          />
          <Footer />
        </div>

        {/* Попап профайла */}
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        {/* Попап добавления новых карточек */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCardAdd={handleAddPlaceSubmit}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Попап подтверждения действий */}
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          textButton="Да"
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          onSubmit={handleCardDelete}
        />

        {/* Попап увеличенной картинки  */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
