import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onCardAdd }) => {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');
  // const [textButton, setTextButton] = useState('Создать');

  //Получаем значения инпутов и кладем в стейт
  const handleChangeName = evt => {
    const cardNameValue = evt.target.value;
    setCardName(cardNameValue);
  };

  const handleChangeLink = evt => {
    const cardLinkValue = evt.target.value;
    setCardLink(cardLinkValue);
  };

  //По субмиту передаем в api и обнуляем стейт
  const handleSubmit = evt => {
    evt.preventDefault();
    onCardAdd({ name: cardName, link: cardLink });
    setCardLink('');
    setCardName('');
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="addCard"
      title="Новое место"
      textButton="Создать"
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          className="form__input form__input_field_title"
          id="title-input"
          placeholder="Название"
          name="name"
          minLength="1"
          maxLength="30"
          required
          value={cardName || ''}
          onChange={handleChangeName}
        />
        <span className="form__input-error" id="title-input-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_field_src"
          id="src-input"
          placeholder="Ссылка на картинку"
          name="link"
          type="URL"
          required
          value={cardLink || ''}
          onChange={handleChangeLink}
        />
        <span className="form__input-error" id="src-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
