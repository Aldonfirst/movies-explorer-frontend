import React from "react";
import "./AboutProject.css"

function AboutProject() {
  return (
    <section className="about">
      <h3 className="page__nav">O проекте</h3>
      <ul className="about__columns">
        <li>
          <h4 className="about__column-inform-title">Дипломный проект включал 5 этапов</h4>
          <p className="about__column-inform-subtitle">Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.</p>
        </li>
        <li>
          <h4 className="about__column-inform-title">На выполнение диплома ушло 5 недель</h4>
          <p className="about__column-inform-subtitle">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about__manufactured">
        <li className="about__week-backend">1 неделя
        <p className="about__label">Back-end</p>
        </li>
        <li className="about__week-frontend">4 недели
        <p className="about__label">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;