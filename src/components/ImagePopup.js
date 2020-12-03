import React from 'react';

//Попап с увеличенной картинкой
const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      className={`modal page__modal modal_target_photoZoom ${
        card.status ? 'modal_active' : '' //Меняем попап в зависимости от состояния
      }`}
    >
      <div
        onClick={onClose}
        className="modal__overlay modal__overlay_background_dark"
      />
      <figure className="zoom">
        <button onClick={onClose} className="zoom__close-btn" type="button" />
        <img src={card.src} alt="" className="zoom__image" />
        <figcaption className="zoom__text-image">{card.name}</figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;
