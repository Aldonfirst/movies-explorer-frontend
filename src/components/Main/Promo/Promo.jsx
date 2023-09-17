import "./Promo.css"
import slinky from "../../../images/slinky-for-header.png"
import Header from "../../Header/Header";

function Promo() {
    return (
      <section className="promo">
        <Header/>
        <div className = "promo__container">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <img className="promo__image" src={slinky} alt="Подпись с Диплома ЯндексПрактикум" />
                </div>
      </section>
    );
  }
  
  export default Promo;
