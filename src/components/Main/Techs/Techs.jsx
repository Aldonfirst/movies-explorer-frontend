import React from "react";
import "./Techs.css"
function Techs() {
  const techNames = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"];
  return (
    <section className="tech" id="techs">
      <h2 className="page__nav">Технологии</h2>
      <h3 className="tech__title">7 технологий</h3>
      <p className="tech__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="tech__list">
        {techNames.map((techName, index) => (
          <li key={index} className="tech__learned">{techName}</li>
        ))}
      </ul>
    </section>
  );
}

export default Techs;