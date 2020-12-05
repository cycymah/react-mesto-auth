import React, { useState } from "react";

const Login = ({ getToken }) => {
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
    getToken(registrationPass, registrationEmail);
  };

  return (
    <form className="login page__authorization" onSubmit={submitRegistration}>
      <div className="login__input-box">
        <h2 className="login__header">Вход</h2>
        <input
          placeholder="Email"
          type="email"
          className="login__input"
          name="email"
          onChange={handleChangeEmail}
        />
        <input
          placeholder="Пароль"
          type="password"
          className="login__input"
          name="password"
          onChange={handleChangePass}
        />
      </div>

      <button type="submit" className="login__submit-btn">
        Войти
      </button>
    </form>
  );
};
export default Login;
