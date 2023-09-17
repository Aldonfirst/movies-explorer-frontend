import './Header.css'
import { useState } from 'react';
import { Link,  } from "react-router-dom";
import Logo from '../HeaderLogo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => {
// временно переключение стейта loggedIn происходит по логотипу 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <Logo setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn && (
        <>
          <Navigation
            isMenuOpen={isMenuOpen}
            closeMenu={closeMenu}
          />
          <button className="header__burger-menu" onClick={toggleMenu}></button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <nav>
            <Link className="header__link-register" to="/signup">Регистрация</Link>
            <Link to="/signin">
              <button type='submit' className="header__login-button">Войти</button>
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;