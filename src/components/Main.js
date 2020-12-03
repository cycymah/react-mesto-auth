import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

const Main = ({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  cards,
  onCardsLike,
  onCardsDelete,
}) => {
  //Подписываемся на контекст
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-box">
          <img
            src={avatar}
            alt="Фотография аватара"
            className="profile__avatar"
          />
          <button
            onClick={onEditAvatar}
            className="profile__edit-avatar-btn"
            type="button"
          >
            <div className="profile__edit-avatar-img" />
          </button>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__title-name">{name}</h1>
          <button onClick={onEditProfile} className="profile__edit-btn" />
          <p className="profile__subtitle-name">{about}</p>
        </div>
        <button onClick={onAddPlace} className="profile__add-button" />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {
            //Перебираем список полученных карточек и возвращаем их в разметку
            cards.map(card => {
              return (
                <Card
                  onCardClick={onCardClick}
                  onCardLike={onCardsLike}
                  onCardDelete={onCardsDelete}
                  key={card._id}
                  name={card.name}
                  link={card.link}
                  likes={card.likes}
                  idCard={card._id}
                  cardOwner={card.owner._id}
                />
              );
            })
          }
        </ul>
      </section>
    </main>
  );
};

export default Main;
