import React from "react";
import logo from "../images/vector.svg";

const Header = ({ isLogin }) => {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип место Россия" className="header__logo" />
      <a href={isLogin ? "/sign-in" : "/sign-up"} className="header__switch">
        {isLogin ? "Регистрация" : "Вход"}
      </a>
    </header>
  );
};
export default Header;
