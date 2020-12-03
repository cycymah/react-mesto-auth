import React from 'react';
import logo from '../images/vector.svg';

const Header = _ => {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип место Россия" className="header__logo" />
    </header>
  );
};
export default Header;
