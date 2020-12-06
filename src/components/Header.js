import React from "react";
import logo from "../images/vector.svg";
import { Link, useLocation } from "react-router-dom";

const Header = ({ loggedIn, emailFromServ, logOut }) => {
  const locationLink = useLocation();

  const linkSwitch = () =>
    locationLink.pathname === "/sign-in" ? (
      <Link className="header__switch" to="/sign-up">
        Регистрация
      </Link>
    ) : (
      <Link className="header__switch" to="/sign-in">
        Вход
      </Link>
    );

  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип место Россия" className="header__logo" />
      {loggedIn ? (
        <div class="header__login-box">
          <p className="header__email">{emailFromServ}</p>
          <a className="header__switch" onClick={logOut}>
            Выйти
          </a>
          d
        </div>
      ) : (
        linkSwitch()
      )}
    </header>
  );
};
export default Header;
