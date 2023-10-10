
import React from 'react';
import './Footer.css';
import { MY_GIT, THIS_IS_YANDEX_PRACTICUM } from '../config/config';

const Footer = () => {
const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <h4 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__container">
        <p className="footer__year"> &copy;{currentYear}</p>
        <ul className='footer__links'>
          <li><a href={THIS_IS_YANDEX_PRACTICUM}
           className="page__hoverLink footer__github" 
           target="_blank" 
           rel="noreferrer"
           >Яндекс.Практикум</a>
           </li>
          <li><a href={MY_GIT}
           className="page__hoverLink footer__github" 
           target="_blank" 
           rel="noreferrer"
           >GitHub</a>
           </li>
      </ul>
      </div>
    </footer>
  );
}

export default Footer;