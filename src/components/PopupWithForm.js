import React from 'react';

const PopupWithForm = ({
  name,
  title,
  children,
  textButton,
  onClose,
  isOpen,
  onSubmit,
}) => {
  return (
    <div
      className={`modal page__modal modal_target_${name} ${
        isOpen ? 'modal_active' : '' //Показываем/убираем попап в зависимости от состояния
      }`}
    >
      <div onClick={onClose} className="modal__overlay" />
      <div className="form">
        <button
          className={`form__close-btn form__close-btn_target_${name}`}
          type="button"
          onClick={onClose}
        />
        <h2 className="form__title">{title}</h2>
        <form
          action="#"
          className={`form__section form__section_target_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className="form__submit-btn" type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
