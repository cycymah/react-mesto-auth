import React from "react";
import logo from "../images/vector.svg";

const Header = ({
  loggedIn,
  isRegister,
  changeRegister,
  emailFromServ,
  logOut,
}) => {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип место Россия" className="header__logo" />
      {loggedIn ? (
        <div class="header__login-box">
          <p className="header__email">{emailFromServ}</p>
          <a className="header__switch" href="" onClick={logOut}>
            Выйти
          </a>
        </div>
      ) : (
        <a
          href={isRegister ? "/sign-up" : "/sign-in"}
          className="header__switch"
          onClick={changeRegister}
        >
          {isRegister ? "Регистрация" : "Вход"}
        </a>
      )}
    </header>
  );
};
export default Header;
