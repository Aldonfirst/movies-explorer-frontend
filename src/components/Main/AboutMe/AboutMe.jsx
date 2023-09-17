import React from "react";
import "./AboutMe.css"
import avatar from "../../../images/картинка на аву.jpg"


function AboutMe() {
  return (
    <section className="about-me" >
      <h3 className="page__nav">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__inform">
          <h2 className="about-me__myName">Дмитрий</h2>
          <p className="about-me__myAge">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__story">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Enim illo nesciunt assumenda provident quia suscipit excepturi quaerat,
            odio pariatur labore dolorem sequi quisquam maxime eaque obcaecati,
            voluptatem animi laudantium eum. 
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Enim illo nesciunt assumenda provident quia suscipit excepturi quaerat
          </p>
        </div>
        <a href="https://github.com/Aldonfirst"
         className="hoverLink about-me__github-link">GitHub</a>
        <img src={avatar} alt="Фото" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;