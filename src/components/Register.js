import React from "react";
import "./Register.css";

const Register = ({ isLoginOpen }) => {
  return (
    <form className="register page__autorization">
      <div className="register__input-box">
        <h2 className="register__header">Регистрация</h2>
        <input placeholder="Email" type="email" className="register__input" />
        <input
          placeholder="Пароль"
          type="password"
          className="register__input"
        />
      </div>
      <div className="register__submit-box">
        <button type="submit" className="register__submit-btn">
          Зарегистрироваться
        </button>
        <span className="register__text">
          Уже зарегистрированы?{" "}
          <a className="register__link" href="/sign-in">
            Войти
          </a>
        </span>
      </div>
    </form>
  );
};
export default Register;
