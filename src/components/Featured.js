import React from "react";
import Icon from "./icons/icon";
import "../styles/Projects.css";

// Add your projects here:
const projects = [
  {
    title: "No Man's Land",
    description: "A third-person survival-mode game where you battle against time and space to return to Earth.",
    tech: ["C#", "Unity"],
    github: "https://github.com/slakh96/no-mans-land",
    external: "https://gazijarin.itch.io/no-mans-land",
    image: "/assets/nomansland.png",
  },
  {
    title: "Truth",
    description: "A three.js simulation of the planet system revolving around a monolith.",
    tech: ["JavaScript", "Three.js"],
    github: "https://github.com/gazijarin/truth",
    external: "https://gazijarin.github.io/Truth/",
    image: "/assets/truth.png",
  },
  // Add more projects as needed...
];

const Featured = () => (
  <section id="projects">
    <div className="section-header ">
          <span className="section-title">Projects I've Wokred On</span>
        </div>
    <ul className="projects-grid">
      {projects.map((project, i) => (
        <li className="project-card" key={i}>
          <div className="project-content">
            <p className="project-overline">Featured Project</p>
            <h3 className="project-title">
              <a href={project.external} target="_blank" rel="noopener noreferrer">{project.title}</a>
            </h3>
            <div className="project-description">{project.description}</div>
            {project.tech && (
              <ul className="project-tech-list">
                {project.tech.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            )}
            <div className="project-links">
              {project.github && (
                <a
                  href={project.github}
                  aria-label="GitHub Link"
                  className="github-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="GitHub" />
                </a>
              )}
              {project.external && (
                <a
                  href={project.external}
                  aria-label="External Link"
                  className="open-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>
          <div className="project-image">
            <a href={project.external || project.github || "#"} target="_blank" rel="noopener noreferrer">
              <img src={project.image} alt={project.title} className="img" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Featured;