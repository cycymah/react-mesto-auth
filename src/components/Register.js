import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ isLoginOpen, registationOnSubmit }) => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPass, setRegistrationPass] = useState("");

  const handleChangeEmail = (evt) => {
    setRegistrationEmail(evt.target.value);
  };
  const handleChangePass = (evt) => {
    setRegistrationPass(evt.target.value);
  };
  const submitRegistration = (evt) => {
    evt.preventDefault();
    registationOnSubmit(registrationPass, registrationEmail);
  };

  return (
    <form className="register page__autorization" onSubmit={submitRegistration}>
      <div className="register__input-box">
        <h2 className="register__header">Регистрация</h2>
        <input
          placeholder="Email"
          type="email"
          className="register__input"
          onChange={handleChangeEmail}
          name="email"
        />
        <input
          placeholder="Пароль"
          type="password"
          className="register__input"
          onChange={handleChangePass}
          name="password"
        />
      </div>
      <div className="register__submit-box">
        <button type="submit" className="register__submit-btn">
          Зарегистрироваться
        </button>
        <span className="register__text">
          Уже зарегистрированы?{" "}
          <Link className="register__link" to="/sign-in">
            Войти
          </Link>
        </span>
      </div>
    </form>
  );
};
export default Register;
