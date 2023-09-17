import React from "react";
import "./Portfolio.css";

const projects = [
  {id: 1,title: "Статичный сайт",link: "https://github.com/Aldonfirst/russian-travel.git"},
  {id: 2,title: "Адаптивный сайт",link: "https://github.com/Aldonfirst/russian-travel.git"},
  {id: 3,title: "Одностраничное приложение",link: "https://github.com/Aldonfirst/react-mesto-api-full-gha.git"},
  // {id:4,title:"",link:"#"},
];

function Portfolio() {
  return (
    <section className="projects">
        <h3 className="projects__signature">Портфолио</h3>
      <ul className="projects__container">
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            <li>
              <h4 className="projects__title-name">
                {project.title}
                <a href={project.link} className=" hoverLink projects__link">&#8599;</a>
              </h4>
            </li>
            {index !== projects.length - 1 && <hr className="projects__divider"/>}
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;