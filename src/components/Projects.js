import React, { useState } from "react";
import ProjectList from "./ProjectList";
import CodeViewer from "./CodeViewer";
import Icon from "./icons/icon";
import FadeInSection from "./FadeInSection";
import DirectoryTree from "./DirectoryTree";
import "../styles/Projects.css";
import "../styles/DirectoryTree.css";

const projectsData = ProjectList;

export default function Projects() {
  const sectionKeys = Object.keys(projectsData);
  const [selected, setSelected] = useState(
    sectionKeys.reduce((acc, section) => {
      acc[section] = { projectIdx: 0, fileIdx: 0 };
      return acc;
    }, {})
  );

  const handleFileSelect = (section, projIdx, fileIdx) => {
    setSelected(prev => ({
      ...prev,
      [section]: { projectIdx: projIdx, fileIdx }
    }));
  };

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-title">Projects</span>
      </div>
      {sectionKeys.map(section => {
        const projects = projectsData[section];
        const { projectIdx, fileIdx } = selected[section];
        const selectedProject = projects[projectIdx];
        const selectedFile = selectedProject.files[fileIdx];

        return (
          <FadeInSection key={section}>
            <div className="projects-directory-layout">
              <h2 className="project-section-title">{section} Projects</h2>
              <div className="project-section">
                <div className="directory-box">
                  <div className="directory-sidebar">
                    <DirectoryTree
                      projects={projects}
                      onFileSelect={(projIdx, fileIdx) => handleFileSelect(section, projIdx, fileIdx)}
                      selectedProjectIdx={projectIdx}
                      selectedFileIdx={fileIdx}
                    />
                  </div>
                  <div className="directory-content">
                    {selectedFile.type === "info" ? (
                      <>
                        <div className="project-image">
                          <img src={selectedProject.image} alt={selectedProject.name} />
                        </div>
                        <h3 className="project-title">{selectedProject.name}</h3>
                        <p className="project-description">{selectedFile.content}</p>
                        <ul className="project-tags">
                          {selectedProject.tags && selectedProject.tags.map((tag, i) => (
                            <li key={i}>{tag}</li>
                          ))}
                        </ul>
                        <div className="project-links">
                          {selectedProject.medium && (
                            <a
                              href={selectedProject.medium}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Article"
                              className="icon-link"
                            >
                              <Icon name="Medium" />
                            </a>
                          )}
                          {selectedProject.github && (
                            <a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="GitHub"
                              className="icon-link"
                            >
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {selectedProject.tableau && (
                            <a
                              href={selectedProject.tableau}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Dashboard"
                              className="icon-link"
                            >
                              <Icon name="Tableau" />
                            </a>
                          )}
                        </div>
                      </>
                    ) : (
                    <CodeViewer code={selectedFile.content} language={selectedFile.language} type={selectedFile.type} />                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        );
      })}
    </section>
  );
}