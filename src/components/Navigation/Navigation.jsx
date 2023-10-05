import { Link, useLocation} from 'react-router-dom';
import "./Navigation.css"
import OverlaySite from '../OverlaySite/OverlaySite';
function Navigation({ isMenuOpen, closeMenu, toggleMenu}) {

    //перекраска  логотипа  у кнопки Аккаунта и UI cсылок
    const location = useLocation();
    const homePage = location.pathname === "/";
    const movieLinkActive =  location.pathname === "/movies";
    const savedMovieLinkActive = location.pathname === "/saved-movies";
  //===========================================
  
  return (
    <>
    <nav className={`navigation ${isMenuOpen ? 'navigation_open' : ''}`}>
      <button className="navigation__close-burger" onClick={closeMenu}>&#215;</button>
      <div className="navigation__links">
        <Link className={`navigation__link-main ${homePage ? 'navigation__link_active' : ''}`} to="/">
          Главная
        </Link>
        <Link className={`navigation__link ${movieLinkActive ? 'navigation__link_active' : ''}`} to="/movies">
          Фильмы
        </Link>
        <Link className={`navigation__link ${savedMovieLinkActive ? 'navigation__link_active' : ''}`} to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </div>
      <Link to="/profile" className="navigation__login-button-account">
        Aккаунт
        <span className={`navigation__login-button-account${homePage ? '-logo_blue' : '-logo'}`} />
      </Link>
    </nav>
    {isMenuOpen && <OverlaySite isMenuOpen={isMenuOpen} closeMenu={closeMenu} />}
    </>
  );
}

export default Navigation;