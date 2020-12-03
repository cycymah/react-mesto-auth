import React from "react";
import "./Login.css";

const Login = (_) => {
  return (
    <form class="login page__authorization">
      <div class="login__input-box">
        <h2 class="login__header">Вход</h2>
        <input placeholder="Email" type="email" class="login__input" />
        <input placeholder="Пароль" type="password" class="login__input" />
      </div>

      <button type="submit" class="login__submit-btn">
        Войти
      </button>
    </form>
  );
};
export default Login;
