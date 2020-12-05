import React from "react";
import logo from "../images/vector.svg";

const Header = ({
  loggedIn,
  isRegister,
  changeRegister,
  emailFromServ,
  logOut,
  changeDirection,
}) => {
  const buttonSwitcher = () => {
    if (isRegister) {
      return (
        <a href="/sign-in" className="header__switch" onClick={changeDirection}>
          Вход
        </a>
      );
    } else {
      return (
        <a href="/sign-up" className="header__switch" onClick={changeDirection}>
          Регистрация
        </a>
      );
    }
  };
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип место Россия" className="header__logo" />
      {loggedIn ? (
        <div class="header__login-box">
          <p className="header__email">{emailFromServ}</p>
          <span className="header__switch" onClick={logOut}>
            Выйти
          </span>
        </div>
      ) : (
        //   buttonSwitcher()
        // )
        <span className="header__switch" onClick={changeRegister}>
          {isRegister ? "Регистрация" : "Вход"}
        </span>
      )}
    </header>
  );
};
export default Header;
