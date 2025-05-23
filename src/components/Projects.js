import React, { useState } from "react";
import CodeViewer from "./CodeViewer";
import Icon from "./icons/icon";
import FadeInSection from "./FadeInSection";
import Code from "./codes/code";
import "../styles/Projects.css";

// Example data structure for each section
const projectsData = {
  SQL: [
    {
      title: "Covid-19 Exploratory Data Analysis",
      description: "Segmented customers based on purchase behavior using advanced SQL queries.",
      image: "/assets/covid19.png",
      code: Code('Covid19'),
      language: "sql",
      github: "https://github.com/yourusername/customer-segmentation-sql",
      tags: ["MySQL", "Analytics"],
    },
    {
      title: "Cyclistic Bike Share Analysis - Google Data Analytics Case Study",
      description: "Segmented customers based on purchase behavior using advanced SQL queries.",
      image: "/assets/covid19.png",
      code: Code('Cyclistic'),
      language: "sql",
      github: "https://github.com/yourusername/customer-segmentation-sql",
      tags: ["MySQL", "Analytics"],
    },
    {
      title: "Customer Segmentation in SQL",
      description: "Segmented customers based on purchase behavior using advanced SQL queries.",
      image: "/assets/covid19.png",
      code: Code('Cyclistic'),
      language: "sql",
      github: "https://github.com/yourusername/customer-segmentation-sql",
      tags: ["MySQL", "Analytics"],
    },

  ],
  Python: [
        {
      title: "Sales Forecasting with Pandas",
      description: "Built a time series model to forecast sales using Python, pandas, and matplotlib.",
      image: "/assets/truth.png",
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n# ...your code here...`,
      language: "python",
      github: "https://github.com/yourusername/sales-forecast",
      tags: ["pandas", "matplotlib", "forecasting"],
    },
            {
      title: "Sales Forecasting with Pandas",
      description: "Built a time series model to forecast sales using Python, pandas, and matplotlib.",
      image: "/assets/truth.png",
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n# ...your code here...`,
      language: "python",
      github: "https://github.com/yourusername/sales-forecast",
      tags: ["pandas", "matplotlib", "forecasting"],
    },
            {
      title: "Sales Forecasting with Pandas",
      description: "Built a time series model to forecast sales using Python, pandas, and matplotlib.",
      image: "/assets/truth.png",
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n# ...your code here...`,
      language: "python",
      github: "https://github.com/yourusername/sales-forecast",
      tags: ["pandas", "matplotlib", "forecasting"],
    }
  ],
  Tableau: [
    {
      title: "Interactive Sales Dashboard",
      description: "Designed an interactive Tableau dashboard for sales KPIs and trends.",
      image: "/assets/talltales.png",
      code: `// Tableau dashboards are visual. See the dashboard link below.`,
      language: "text",
      external: "https://public.tableau.com/app/profile/yourprofile/viz/SalesDashboard",
      tags: ["Tableau", "Visualization"],
    },
    // Add more Tableau projects...
  ],
};

export default function Projects() {
  // Track which tab is open for each project (by section and index)
  const [selectedTabs, setSelectedTabs] = useState({});

  const handleTabChange = (section, idx, tab) => {
    setSelectedTabs(prev => ({
      ...prev,
      [`${section}-${idx}`]: tab
    }));
  };

  return (
    <section id="projects">
    <FadeInSection>
      <div className="section-header">
        <span className="section-title">Projects</span>
      </div>
      {Object.keys(projectsData).map(section => (
        <div key={section} className="project-section">
          <h2 className="project-subtitle">{section} Projects</h2>
          <ul className="projects-grid">
            {projectsData[section].map((project, idx) => {
              const tabKey = `${section}-${idx}`;
              const selectedTab = selectedTabs[tabKey] || "Info";
              return (
                <li key={idx}>
                  <div className="project-card-flex">
                    <div className="project-card-menu">
                      <button
                        className={selectedTab === "Info" ? "active" : ""}
                        onClick={() => handleTabChange(section, idx, "Info")}
                      >
                        Info
                      </button>
                      <button
                        className={selectedTab === "See Code" ? "active" : ""}
                        onClick={() => handleTabChange(section, idx, "See Code")}
                      >
                        See Code
                      </button>
                    </div>
                    <div className="project-card-content">
                      {selectedTab === "Info" ? (
                        <>
                          <div className="project-image">
                            <img src={project.image} alt={project.title} />
                          </div>
                          <h3>{project.title}</h3>
                          <p className="project-description">{project.description}</p>
                          <ul className="project-tags">
                            {project.tags && project.tags.map((tag, i) => (
                              <li key={i}>{tag}</li>
                            ))}
                          </ul>
                            <div className="project-links">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="GitHub"
                                  className="icon-link"
                                >
                                  <Icon name="GitHub" />
                                </a>
                              )}
                              {project.external && (
                                <a
                                  href={project.external}
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
                        <CodeViewer code={project.code} language={project.language} />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </FadeInSection>
    </section>
  );
}