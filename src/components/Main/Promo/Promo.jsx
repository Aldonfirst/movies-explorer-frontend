import "./Promo.css"

import Header from "../../Header/Header";

function Promo({isLoggedIn}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <section className="promo">
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <div className="promo__image" /></div>
      </section>
    </>
  );
}

export default Promo;
