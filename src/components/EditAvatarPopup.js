import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const urlRef = useRef('');

  //Действие при субмите для отправки ссылки на автар к api
  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: urlRef.current.value });
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="profile-avatar"
      title="Обновить автар"
      textButton="Сохранить"
    >
      <label className="form__field">
        <input
          className="form__input form__input_field_avatar"
          id="avatar-input"
          placeholder="Ссылка на картинку"
          name="pictureSource"
          type="URL"
          ref={urlRef}
          required
        />
        <span className="form__input-error" id="avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
