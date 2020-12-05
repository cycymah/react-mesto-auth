import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import Main from "./Main.js";
import Header from "./Header.js";
import api from "../utils/Api.js";
import Register from "./Register";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import PopupWithForm from "./PopupWithForm.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { authApi, authApiCheck } from "../utils/Auth";
import PopupNotification from "./PopupNotification";

const App = (_) => {
  let history = new useHistory();

  //Задаем состояния компонента
  const [isEditProfilePopupOpen, setProfileStatus] = useState(false);
  const [isAddPlacePopupOpen, setPlaceStatus] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarStatus] = useState(false);
  const [isConfirmPopupOpen, setConfirmStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentCardId, setCurrentCardId] = useState("");
  const [cards, setCards] = useState([]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loadingOk, setLoadingOk] = useState(true);

  const [isRegister, setIsRegister] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailFromServ, setEmailFromServ] = useState("");

  //Берем данные профайла для контекста
  useEffect((_) => {
    api
      .getProfileInformation()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  //Запрос к API для получения карточек
  useEffect((_) => {
    const getCards = api.getInitialCards("cards");
    getCards
      .then((dataCard) => {
        setCards(dataCard);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getLocalToken = localStorage.getItem("jwt");
    if (getLocalToken) {
      authApiCheck(getLocalToken)
        .then((res) => {
          if (res.data) {
            setEmailFromServ(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // Берем токен
  const getToken = (registrationPass, registrationEmail) => {
    authApi(registrationPass, registrationEmail, "signin")
      .then((token) => {
        if (token.token) {
          localStorage.setItem("jwt", token.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("first err", err);
      });
  };

  const registationOnSubmit = (registrationPass, registrationEmail) => {
    setLoadingOk(true);
    authApi(registrationPass, registrationEmail, "signup")
      .then((res) => {
        if (res.data) {
          setIsNotificationOpen(true);
        }
      })
      .catch((err) => {
        setLoadingOk(false);
        setIsNotificationOpen(true);
      });
  };

  const changeRegister = () => {
    setIsRegister(!isRegister);
    if (isRegister) {
      history.push("/sign-up");
    } else {
      history.push("/sign-in");
    }
  };

  //Выходим
  const logOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  //Изменения состояния для закрытия попапов
  const closeAllPopups = (_) => {
    setAvatarStatus(false);
    setPlaceStatus(false);
    setProfileStatus(false);
    setSelectedCard(false);
    setConfirmStatus(false);
    setIsNotificationOpen(false);
  };

  //Функция для открытия увеличенной карточки по клику
  const handleCardClick = ({ link, name }) => {
    setSelectedCard({ status: true, src: link, name: name });
  };

  //Проверяем лайки, меняем статус запросом к api и создаем новый массив карточек в стейт
  const handleCardLike = ({ likes, idCard }) => {
    const isLiked = likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(idCard, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((singleCard) =>
          singleCard._id === idCard ? newCard : singleCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  //Удаление карточки запрос к api и обновление стейта
  const handleCardDelete = (evt) => {
    evt.preventDefault();
    api
      .removeCard(currentCardId)
      .then((_) => {
        const newCardList = cards.filter((card) => currentCardId !== card._id);
        setCards(newCardList);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //Запрос к Api для изменения аватара
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateUserAvatar({ avatar })
      .then((UserData) => {
        setCurrentUser(UserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //Запрос к api для изменения профайла
  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUserInformation({ name, about })
      .then((UserData) => {
        setCurrentUser(UserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //Запрос к api для добавления карточки
  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //Функции изменения состояния для открытия попапов
  const handleEditAvatarClick = (_) => {
    setAvatarStatus(true);
  };
  const handleEditProfileClick = (_) => {
    setProfileStatus(true);
  };
  const handleAddPlaceClick = (_) => {
    setPlaceStatus(true);
  };
  const handleConfirmClick = (cardId) => {
    setCurrentCardId(cardId);
    setConfirmStatus(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            logOut={logOut}
            emailFromServ={emailFromServ}
            changeRegister={changeRegister}
          />

          <Switch>
            <Route path="/sign-in">
              <Login getToken={getToken} />
            </Route>
            <Route path="/sign-up">
              <Register registationOnSubmit={registationOnSubmit} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardsLike={handleCardLike}
              onCardsDelete={handleConfirmClick}
              cards={cards}
            />
          </Switch>
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

        <PopupNotification
          isOpen={isNotificationOpen}
          onClose={closeAllPopups}
          loadingOk={loadingOk}
        ></PopupNotification>

        {/* Попап увеличенной картинки  */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
