import React from "react";
import "./PopupNotification.css";
import ok from "../images/ok.svg";
import notok from "../images/notok.svg";

//Попап с увеличенной картинкой
const PoppupNotification = ({ isOpen, onClose, loadingOk }) => {
  return (
    <div
      className={`modal page__modal modal_target_notification ${
        isOpen ? "modal_active" : "" //Меняем попап в зависимости от состояния
      }`}
    >
      <div
        onClick={onClose}
        className="modal__overlay modal__overlay_background_dark"
      />
      <div className="notification">
        <button
          onClick={onClose}
          className="notification__close-btn"
          type="button"
        />
        <div className="notification__box">
          {loadingOk ? (
            <img src={ok} alt="Все отлично" />
          ) : (
            <img src={notok} alt="Что-то пошло не так" />
          )}
          <span className="notification__text">
            {loadingOk
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoppupNotification;
