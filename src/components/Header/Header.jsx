import './Header.css'
import { useState } from 'react';
import { Link, useLocation,  } from "react-router-dom";
import Logo from '../HeaderLogo/Logo';
import Navigation from '../Navigation/Navigation';

import { useContext } from 'react';
import { CurrentUserContext } from '../Contexts/UserСontext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const homePage = location.pathname === "/";
  const { currentUser } = useContext(CurrentUserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${homePage ? 'header_blue' : ''}`}>
      <Logo />
      {currentUser ? (
        <>
          <Navigation isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
          <button type="button" className="header__burger-menu" onClick={toggleMenu}></button>
        </>
      ):(
        <nav>
          <Link className="header__link-register" to="/signup">
            Регистрация
          </Link>
          <Link to="/signin">
            <button type="submit" className="header__login-button">
              Войти
            </button>
          </Link>
        </nav>
      )}
     
    </header>
  );
};
export default Header;