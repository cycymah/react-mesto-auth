import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Card = ({
  link,
  likes,
  name,
  idCard,
  onCardClick,
  onCardLike,
  onCardDelete,
  cardOwner,
}) => {
  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки и есть ли лайки владельца у карточек
  const isOwn = cardOwner === currentUser._id;
  const isLiked = likes.some(like => like._id === currentUser._id);

  // Создаём переменную для класса корзины и лайка
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? 'elements__like_active' : ''
  }`;
  const cardDeleteButtonClassName = `elements__trash ${
    isOwn ? '' : 'elements__trash_display_none'
  }`;

  //Функция открытия картинки по клику
  const handleCardClick = _ => {
    onCardClick({ link, name });
  };

  //Лайк по клику
  const handleLikeClick = _ => {
    onCardLike({ likes, idCard });
  };

  //Удаление карточки по клику
  const handleCardDelete = _ => {
    onCardDelete(idCard);
  };

  return (
    <>
      <li className="elements__item">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
          type="button"
        />
        <figure className="elements__item-card">
          <img
            onClick={handleCardClick}
            src={link}
            alt={name}
            className="elements__image"
          />
          <figcaption className="elements__image-content-box">
            <p className="elements__image-description">{name}</p>
            <div className="elements__like-button-box">
              <button
                className={cardLikeButtonClassName}
                onClick={handleLikeClick}
              />
              <span className="elements__like-counter">
                {likes.length >= 1 ? likes.length : ''}
              </span>
            </div>
          </figcaption>
        </figure>
      </li>
    </>
  );
};

export default Card;
