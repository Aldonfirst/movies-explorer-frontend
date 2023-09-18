import React from "react";
import "./Portfolio.css";

const projects = [
  { id: 1, title: "Статичный сайт", link: "https://github.com/Aldonfirst/russian-travel.git" },
  { id: 2, title: "Адаптивный сайт", link: "https://github.com/Aldonfirst/russian-travel.git" },
  { id: 3, title: "Одностраничное приложение", link: "https://github.com/Aldonfirst/react-mesto-api-full-gha.git" },
  // {id:4,title:"",link:"#"},
];

function Portfolio() {
  return (
    <section className="projects">
      <h2 className="projects__signature">Портфолио</h2>
      <ul className="projects__container">
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            <li>
              <a href={project.link}
                target="_blank"
                rel="noreferrer"
                className="page__hoverLink projects__link">{project.title}
                <span>&#8599;</span>
              </a>
            </li>
            {index !== projects.length - 1 && <hr className="projects__divider" />}
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;