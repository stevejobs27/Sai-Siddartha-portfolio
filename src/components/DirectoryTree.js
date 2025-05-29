import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  VscFolder, VscFolderOpened, VscMarkdown, VscChevronRight
} from "react-icons/vsc";
import { SiMysql, SiPython } from "react-icons/si";

function getFileIcon(file) {
  const iconStyle = { marginRight: 6, fontSize: 15, flexShrink: 0 };
  if (file.name.endsWith(".md")) return <VscMarkdown style={{ ...iconStyle, color: "#519975" }} />;
  if (file.name.endsWith(".sql")) return <SiMysql style={{ ...iconStyle, color: "#00758f" }} />;
  if (file.name.endsWith(".ipynb")) return <SiPython style={{ ...iconStyle, color: "#3572A5" }} />;
}

const getInitialOpenFolders = projects =>
  Object.fromEntries(projects.map((_, idx) => [idx, idx === 0]));

const getReadmeIdx = files =>
  files.findIndex(file => file.name.toLowerCase() === "readme.md") || 0;

export default function DirectoryTree({
  projects,
  onFileSelect,
  selectedProjectIdx,
  selectedFileIdx
}) {
  const [openFolders, setOpenFolders] = useState(() => getInitialOpenFolders(projects));
  const treeRef = useRef(null);
  const foldersRef = useRef([]);
  const filesRef = useRef({});
  
  // Keep refs updated when projects change
  useEffect(() => {
    foldersRef.current = Array(projects.length).fill().map(() => React.createRef());
    filesRef.current = {};
    projects.forEach((_, idx) => {
      filesRef.current[idx] = React.createRef();
    });
  }, [projects]);
  
  // Initial animation when component mounts
  useEffect(() => {
    if (!treeRef.current) return;
    
    const folders = treeRef.current.querySelectorAll('.directory-folder');
    
    gsap.set(folders, { opacity: 0, x: -20 });
    gsap.to(folders, {
      opacity: 1, 
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, []);

  // Animate file selection
  useEffect(() => {
    if (selectedProjectIdx === null || selectedFileIdx === null) return;
    
    const activeFile = treeRef.current.querySelector('.directory-file-btn.active');
    if (activeFile) {
      // Flash effect on select
      gsap.fromTo(activeFile, 
        { backgroundColor: "rgba(100, 217, 138, 0.2)" },
        { 
          backgroundColor: "rgba(100, 217, 138, 0.1)", 
          duration: 0.8,
          ease: "power2.out"
        }
      );
      
      // Subtle scale pulse
      gsap.fromTo(activeFile,
        { scale: 1 },
        { 
          scale: 1.03, 
          duration: 0.3,
          ease: "back.out(1.7)",
          yoyo: true,
          repeat: 1
        }
      );
    }
  }, [selectedProjectIdx, selectedFileIdx]);


  // Animate folder opening/closing
  const animateFolderToggle = (idx, isOpen) => {
    if (!filesRef.current[idx]?.current) return;
    
    const folderEl = foldersRef.current[idx].current;
    const filesEl = filesRef.current[idx].current;
    const fileItems = filesEl.querySelectorAll('li');
    const chevron = folderEl.querySelector('.chevron-icon');
    
    if (isOpen) {
      // Make files visible before animating
      filesEl.style.display = 'block';
      filesEl.style.height = '0px';
      filesEl.style.opacity = '0';
      
      // Open animation
      gsap.to(filesEl, { 
        height: 'auto', 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out",
        onComplete: () => {
          // Clear inline height after animation to avoid conflicts
          filesEl.style.height = '';
        }
      });
      
      // Stagger in files
      gsap.from(fileItems, {
        x: -10,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: "power1.out"
      });
      
      // Animate folder icon color
      gsap.to(folderEl.querySelector('.folder-icon'), {
        color: "var(--green-bright)",
        duration: 0.3
      });
      
      // Animate chevron - simpler approach without rotation reset
      gsap.to(chevron, {
        rotate: 90,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Close animation
      gsap.to(filesEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Hide files after animation completes
          filesEl.style.display = 'none';
        }
      });
      
      // Animate folder icon color
      gsap.to(folderEl.querySelector('.folder-icon'), {
        color: "#8da1b9",
        duration: 0.3
      });
      
      // Animate chevron - simpler approach without rotation reset
      gsap.to(chevron, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  // Unified handler: toggles open/close on any folder element click
  const handleToggleOrSelect = idx => {
    if (!openFolders[idx]) {
      // If closed, open and select README.md (or first file)
      setOpenFolders(prev => ({ ...prev, [idx]: true }));
      const readmeIdx = getReadmeIdx(projects[idx].files);
      onFileSelect(idx, readmeIdx);
      
      // Run animation after state update
      setTimeout(() => animateFolderToggle(idx, true), 0);
    } else if (selectedProjectIdx === idx) {
      // If open and already selected, close it
      animateFolderToggle(idx, false);
      
      // Delay state update until animation completes
      setTimeout(() => {
        setOpenFolders(prev => ({ ...prev, [idx]: false }));
      }, 300);
    } else {
      // If open but not selected, just select it
      const readmeIdx = getReadmeIdx(projects[idx].files);
      onFileSelect(idx, readmeIdx);
    }
  };

  // Handle file hover animations
  const handleFileHover = (enter, element) => {
    if (enter) {
      gsap.to(element, {
        paddingLeft: "12px",
        color: "var(--green-bright)",
        duration: 0.2
      });
    } else {
      gsap.to(element, {
        paddingLeft: "8px",
        color: "var(--lightest-slate)",
        duration: 0.2
      });
    }
  };

  return (
    <ul className="directory-tree" ref={treeRef}>
      {projects.map((project, idx) => (
        <li key={idx} className="project-item">
          <div
            ref={foldersRef.current[idx]}
            className={`directory-folder${openFolders[idx] ? " open" : ""}`}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={e => {
              e.stopPropagation();
              handleToggleOrSelect(idx);
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                backgroundColor: "rgba(100, 217, 138, 0.05)",
                duration: 0.2
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                backgroundColor: "transparent",
                duration: 0.2
              });
            }}
          >
            <span
              className="chevron-wrapper"
              onClick={e => {
                e.stopPropagation();
                handleToggleOrSelect(idx);
              }}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              {openFolders[idx]
                ? <VscChevronRight className="chevron-icon" style={{ marginRight: 2, verticalAlign: "middle", fontSize: 15, flexShrink: 0 }} />
                : <VscChevronRight className="chevron-icon" style={{ marginRight: 2, verticalAlign: "middle", fontSize: 15, flexShrink: 0 }} />}
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                handleToggleOrSelect(idx);
              }}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              {openFolders[idx]
                ? <VscFolderOpened className="folder-icon" style={{ marginRight: 6, verticalAlign: "middle", color: "var(--green-bright)", fontSize: 15, flexShrink: 0 }} />
                : <VscFolder className="folder-icon" style={{ marginRight: 6, verticalAlign: "middle", color: "#8da1b9", fontSize: 15, flexShrink: 0 }} />}
            </span>
            <span className="folder-name">{project.name}</span>
          </div>
          
          <ul 
            ref={filesRef.current[idx]} 
            className="directory-files"
            style={{ 
              display: openFolders[idx] ? "block" : "none",
              overflow: "hidden"
            }}
          >
            {project.files.map((file, fIdx) => (
              <li key={fIdx} className="file-item">
                <button
                  className={`directory-file-btn${selectedProjectIdx === idx && selectedFileIdx === fIdx ? " active" : ""}`}
                  onClick={e => {
                    e.stopPropagation();
                    
                    // Add subtle scale animation on click
                    gsap.fromTo(e.currentTarget, 
                      { scale: 0.98 }, 
                      { scale: 1, duration: 0.2, ease: "back.out(1.5)" }
                    );
                    
                    onFileSelect(idx, fIdx);
                  }}
                  onMouseEnter={(e) => handleFileHover(true, e.currentTarget)}
                  onMouseLeave={(e) => handleFileHover(false, e.currentTarget)}
                >
                  {getFileIcon(file)}
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}