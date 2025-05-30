import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import ProjectList from "./ProjectList";
import CodeViewer from "./CodeViewer";
import Icon from "./Icons";
import "../styles/Projects.css";
import {
  VscFolder, VscFolderOpened, VscMarkdown, VscChevronRight
} from "react-icons/vsc";
import { SiMysql, SiPython } from "react-icons/si";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

const projectsData = ProjectList;

// Helper functions for directory tree
function getFileIcon(file) {
  const iconStyle = { marginRight: 6, fontSize: 15, flexShrink: 0 };
  if (file.name.endsWith(".md")) return <VscMarkdown style={{ ...iconStyle, color: "#519975" }} />;
  if (file.name.endsWith(".sql")) return <SiMysql style={{ ...iconStyle, color: "#00758f" }} />;
  if (file.name.endsWith(".ipynb")) return <SiPython style={{ ...iconStyle, color: "#3572A5" }} />;
  // Default icon if no match
  return <VscMarkdown style={{ ...iconStyle, color: "#8da1b9" }} />;
}

const getInitialOpenFolders = projects =>
  Object.fromEntries(projects.map((_, idx) => [idx, idx === 0]));

const getReadmeIdx = files =>
  files.findIndex(file => file.name.toLowerCase() === "readme.md") || 0;

export default function Projects() {
  const sectionKeys = Object.keys(projectsData);
  const [selected, setSelected] = useState(
    sectionKeys.reduce((acc, section) => {
      acc[section] = { projectIdx: 0, fileIdx: 0 };
      return acc;
    }, {})
  );
  
  // Directory tree state
  const [openFolders, setOpenFolders] = useState({});
  const [activeFolders, setActiveFolders] = useState({});
  
  // Refs for animations
  const projectsRef = useRef(null);
  const sectionsRef = useRef([]);
  const contentRefs = useRef({});
  const foldersRef = useRef({});
  const filesListRef = useRef({});
  
  // Initialize refs
  useEffect(() => {
    // Initialize content refs
    contentRefs.current = sectionKeys.reduce((acc, section) => {
      acc[section] = React.createRef();
      return acc;
    }, {});
    
    // Initialize directory tree refs and state
    sectionKeys.forEach(section => {
      foldersRef.current[section] = {};
      filesListRef.current[section] = {};
      
      // Set initial open state
      const initialOpenState = getInitialOpenFolders(projectsData[section]);
      
      setOpenFolders(prev => ({
        ...prev,
        [section]: initialOpenState
      }));
      
      setActiveFolders(prev => ({
        ...prev,
        [section]: 0 // Default first folder active
      }));
    });
    
    // Debug log
    console.log("Projects data:", projectsData);
    console.log("Section keys:", sectionKeys);
  }, []);

  // Page load animations - using the animation style from the prompt
  useEffect(() => {
    // Create a timeline for initial section animations
    const tl = gsap.timeline();
    
    // Animate section headers
    tl.from(".section-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Create scroll triggers for each project section
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      
      // Create scroll animation for each project section
      gsap.fromTo(section,
        { 
          y: 100, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Create subtle parallax effect on project boxes
    gsap.to(".directory-box", {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
    
    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate folder opening/closing
  const animateFolderToggle = (section, idx, isOpen) => {
    const folderEl = foldersRef.current?.[section]?.[idx];
    const filesEl = filesListRef.current?.[section]?.[idx];
    
    if (!folderEl || !filesEl) return;
    
    const fileItems = filesEl.querySelectorAll('li');
    const chevron = folderEl.querySelector('.chevron-icon');
    
    if (isOpen) {
      // Open animation
      filesEl.style.display = 'block';
      filesEl.style.height = '0px';
      
      gsap.to(filesEl, { 
        height: 'auto', 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out",
        onComplete: () => filesEl.style.height = ''
      });
      
      // Stagger in files
      gsap.from(fileItems, {
        x: -10,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04
      });
      
      // Animate folder icon and chevron
      gsap.to(folderEl.querySelector('.folder-icon'), {
        color: "var(--green-bright)",
        duration: 0.3
      });
      
      gsap.to(chevron, {
        rotate: 90,
        duration: 0.3
      });
    } else {
      // Close animation
      gsap.to(filesEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => filesEl.style.display = 'none'
      });
      
      // Animate folder icon and chevron
      gsap.to(folderEl.querySelector('.folder-icon'), {
        color: "#8da1b9",
        duration: 0.3
      });
      
      gsap.to(chevron, {
        rotate: 0,
        duration: 0.3
      });
    }
  };

  // Handle folder click - toggle open/closed state with smooth transitions
  const handleFolderToggle = (section, idx) => {
    // Capture the state before changes for smooth animation
    const state = contentRefs.current[section]?.current && 
                 Flip.getState(contentRefs.current[section].current);
    
    // Set this folder as active
    setActiveFolders(prev => ({
      ...prev,
      [section]: idx
    }));
    
    const isCurrentlyOpen = openFolders[section]?.[idx];
    
    if (!isCurrentlyOpen) {
      // If closed, open it with smooth animation
      gsap.to(foldersRef.current[section][idx], {
        backgroundColor: "rgba(100, 217, 138, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      setOpenFolders(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [idx]: true
        }
      }));
      
      // Select the README or first file
      const readmeIdx = getReadmeIdx(projectsData[section][idx].files);
      handleFileSelect(section, idx, readmeIdx);
      
      // Run animation with a slight delay for better visual flow
      setTimeout(() => animateFolderToggle(section, idx, true), 50);
    } else if (selected[section].projectIdx === idx) {
      // If open and already selected, close it with animation
      animateFolderToggle(section, idx, false);
      
      gsap.to(foldersRef.current[section][idx], {
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.in"
      });
      
      // Delay state update until animation completes
      setTimeout(() => {
        setOpenFolders(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [idx]: false
          }
        }));
      }, 300);
    } else {
      // If open but not selected, just select the README with smooth transition
      const readmeIdx = getReadmeIdx(projectsData[section][idx].files);
      
      // Animate the selection change
      gsap.to(foldersRef.current[section][activeFolders[section]], {
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.in"
      });
      
      gsap.to(foldersRef.current[section][idx], {
        backgroundColor: "rgba(100, 217, 138, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      handleFileSelect(section, idx, readmeIdx);
    }
    
    // Apply FLIP animation for smooth content transition
    if (state) {
      setTimeout(() => {
        Flip.from(state, {
          duration: 0.6,
          ease: "power2.inOut",
          absolute: true,
          onEnter: elements => 
            gsap.fromTo(elements, 
              { opacity: 0, scale: 0.95 }, 
              { opacity: 1, scale: 1, duration: 0.4 }
            ),
          onLeave: elements => 
            gsap.to(elements, 
              { opacity: 0, scale: 0.95, duration: 0.3 }
            )
        });
      }, 10);
    }
  };

  // Handle file selection
  const handleFileSelect = (section, projectIdx, fileIdx) => {
    // Make sure folder is open
    setOpenFolders(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [projectIdx]: true
      }
    }));
    
    // Set folder as active
    setActiveFolders(prev => ({
      ...prev,
      [section]: projectIdx
    }));
    
    // Save the current state for animation
    const state = contentRefs.current[section]?.current && 
                 Flip.getState(contentRefs.current[section].current);
    
    // Update the selection
    setSelected(prev => ({
      ...prev,
      [section]: { projectIdx, fileIdx }
    }));
    
    // After state updates, animate the transition
    if (state) {
      setTimeout(() => {
        // Animate content change
        Flip.from(state, {
          duration: 0.6,
          ease: "power2.inOut",
          absolute: true,
          onEnter: elements => 
            gsap.fromTo(elements, 
              { opacity: 0, scale: 0.95 }, 
              { opacity: 1, scale: 1, duration: 0.4, delay: 0.2 }
            ),
          onLeave: elements => 
            gsap.to(elements, 
              { opacity: 0, scale: 0.95, duration: 0.3 }
            )
        });
      }, 10);
    }
  };

  // File hover animation
  const handleFileHover = (enter, element) => {
    if (!element.classList.contains('active')) {
      gsap.to(element, {
        paddingLeft: enter ? "12px" : "8px",
        color: enter ? "var(--green-bright)" : "var(--lightest-slate)",
        duration: 0.2
      });
    }
  };

  // Animate code highlighting when file type changes
  useEffect(() => {
    sectionKeys.forEach(section => {
      const { projectIdx, fileIdx } = selected[section];
      const selectedFile = projectsData[section][projectIdx]?.files[fileIdx];
      
      if (selectedFile?.type === "code" && contentRefs.current[section]?.current) {
        const codeBlocks = contentRefs.current[section].current.querySelectorAll('pre code');
        
        if (codeBlocks.length) {
          gsap.fromTo(codeBlocks, 
            { opacity: 0, y: 20 }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: 0.05,
              ease: "power2.out" 
            }
          );
        }
      }
    });
  }, [selected]);

  // Store folder reference safely
  const saveFolderRef = (section, idx, el) => {
    if (!foldersRef.current[section]) {
      foldersRef.current[section] = {};
    }
    foldersRef.current[section][idx] = el;
  };

  // Store files list reference safely
  const saveFilesListRef = (section, idx, el) => {
    if (!filesListRef.current[section]) {
      filesListRef.current[section] = {};
    }
    filesListRef.current[section][idx] = el;
  };

  return (
    <section id="projects" ref={projectsRef}>
      <div className="section-header">
        <span className="section-title">Projects</span>
      </div>
      
      {sectionKeys.map((section, sectionIndex) => {
        const projects = projectsData[section];
        const { projectIdx, fileIdx } = selected[section];
        const selectedProject = projects[projectIdx];
        const selectedFile = selectedProject.files[fileIdx];
        const activeFolder = activeFolders[section];

        return (
          <div 
            key={section}
            ref={el => sectionsRef.current[sectionIndex] = el}
            className="projects-section-container"
          >
            <div className="projects-directory-layout">
              <h2 className="project-section-title">
                <span className="gradient-text">{section}</span> Projects
              </h2>
              
              <div className="project-section">
                <div className="directory-box gradient-border">
                  <div className="directory-sidebar">
                    <ul className="directory-tree">
                      {projects.map((project, idx) => {
                        const isOpen = openFolders[section]?.[idx];
                        const isActive = activeFolder === idx;
                        const isSqlProject = project.name.toLowerCase().includes('sql') || 
                                         project.files.some(file => file.name.endsWith('.sql'));
                        
                        return (
                          <li 
                            key={idx} 
                            className="project-item"
                            data-project-type={isSqlProject ? "sql" : "other"}
                          >
                            <div
                              ref={el => saveFolderRef(section, idx, el)}
                              className={`directory-folder ${isOpen ? "open" : ""} ${isActive ? "active" : ""}`}
                              onClick={() => handleFolderToggle(section, idx)}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  gsap.to(e.currentTarget, {
                                    backgroundColor: "rgba(100, 217, 138, 0.05)",
                                    duration: 0.2
                                  });
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  gsap.to(e.currentTarget, {
                                    backgroundColor: "transparent",
                                    duration: 0.2
                                  });
                                }
                              }}
                            >
                              <VscChevronRight 
                                className="chevron-icon" 
                                style={{ 
                                  marginRight: 2, 
                                  fontSize: 15, 
                                  flexShrink: 0,
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                                }} 
                              />
                              {isOpen
                                ? <VscFolderOpened className="folder-icon" style={{ 
                                    marginRight: 6, 
                                    color: isActive ? "var(--green-bright)" : "#8da1b9", 
                                    fontSize: 15, 
                                    flexShrink: 0 
                                  }} />
                                : <VscFolder className="folder-icon" style={{ 
                                    marginRight: 6, 
                                    color: isActive ? "var(--green-bright)" : "#8da1b9", 
                                    fontSize: 15, 
                                    flexShrink: 0 
                                  }} />
                              }
                              <span className="folder-name">{project.name}</span>
                            </div>
                            
                            <ul 
                              ref={el => saveFilesListRef(section, idx, el)}
                              className="directory-files"
                              style={{ 
                                display: isOpen ? "block" : "none",
                                overflow: "hidden"
                              }}
                            >
                              {project.files.map((file, fIdx) => {
                                const isActiveFile = projectIdx === idx && fileIdx === fIdx;
                                
                                return (
                                  <li key={fIdx} className="file-item">
                                    <button
                                      className={`directory-file-btn${isActiveFile ? " active" : ""}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        
                                        // Add subtle scale animation on click
                                        gsap.fromTo(e.currentTarget, 
                                          { scale: 0.98 }, 
                                          { scale: 1, duration: 0.2, ease: "back.out(1.5)" }
                                        );
                                        
                                        handleFileSelect(section, idx, fIdx);
                                      }}
                                      onMouseEnter={(e) => handleFileHover(true, e.currentTarget)}
                                      onMouseLeave={(e) => handleFileHover(false, e.currentTarget)}
                                    >
                                      {getFileIcon(file)}
                                      {file.name}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div 
                    className="directory-content"
                    ref={contentRefs.current[section]}
                  >
                    {selectedFile.type === "info" ? (
                      <div className="project-info-container">
                        <div className="project-image-container">
                          {selectedProject.tableau ? (
                            <a
                              href={selectedProject.tableau}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Tableau Dashboard"
                              className="image-link hover-effect"
                            >
                              <div className="image-overlay">
                                <span>View Dashboard</span>
                              </div>
                              <img src={selectedProject.image} alt={selectedProject.name} />
                            </a>
                          ) : (
                            <div className="image-wrapper">
                              <img src={selectedProject.image} alt={selectedProject.name} />
                            </div>
                          )}
                        </div>
                        
                        <h3 className="project-title gradient-text">{selectedProject.name}</h3>
                        
                        <p className="project-description">{selectedFile.content}</p>
                        
                        <ul className="project-tags">
                          {selectedProject.tags && selectedProject.tags.map((tag, i) => (
                            <li key={i} className="tag-pill">{tag}</li>
                          ))}
                        </ul>
                        
                        <div className="project-links">
                          {selectedProject.medium && (
                            <a
                              href={selectedProject.medium}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Article"
                              className="icon-link medium-link"
                              onMouseEnter={e => {
                                gsap.to(e.currentTarget, {
                                  scale: 1.15,
                                  duration: 0.3,
                                  ease: "back.out(1.7)"
                                });
                              }}
                              onMouseLeave={e => {
                                gsap.to(e.currentTarget, {
                                  scale: 1,
                                  duration: 0.3
                                });
                              }}
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
                              className="icon-link github-link"
                              onMouseEnter={e => {
                                gsap.to(e.currentTarget, {
                                  scale: 1.15,
                                  duration: 0.3,
                                  ease: "back.out(1.7)"
                                });
                              }}
                              onMouseLeave={e => {
                                gsap.to(e.currentTarget, {
                                  scale: 1,
                                  duration: 0.3
                                });
                              }}
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
                              className="icon-link tableau-link"
                              onMouseEnter={e => {
                                gsap.to(e.currentTarget, {
                                  scale: 1.15,
                                  duration: 0.3,
                                  ease: "back.out(1.7)"
                                });
                              }}
                              onMouseLeave={e => {
                                gsap.to(e.currentTarget, {
                                  scale: 1,
                                  duration: 0.3
                                });
                              }}
                            >
                              <Icon name="Tableau" />
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="code-viewer-container">
                        <div className="code-header">
                          <span className="file-name">{selectedFile.name}</span>
                          <div className="code-language-badge">
                            {selectedFile.language}
                          </div>
                        </div>
                        <CodeViewer
                          code={selectedFile.content}
                          language={selectedFile.language}
                          type={selectedFile.type}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}