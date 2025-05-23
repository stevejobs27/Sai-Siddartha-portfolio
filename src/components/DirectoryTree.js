import React, { useState } from "react";

export default function DirectoryTree({ projects, onFileSelect, selectedProjectIdx, selectedFileIdx }) {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = idx => {
    setOpenFolders(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <ul className="directory-tree">
      {projects.map((project, idx) => (
        <li key={idx}>
          <div
            className={`directory-folder${openFolders[idx] ? " open" : ""}`}
            onClick={() => toggleFolder(idx)}
          >
            <span>{openFolders[idx] ? "📂" : "📁"} {project.name}</span>
          </div>
          {openFolders[idx] && (
            <ul className="directory-files">
              {project.files.map((file, fIdx) => (
                <li key={fIdx}>
                  <button
                    className={`directory-file-btn${selectedProjectIdx === idx && selectedFileIdx === fIdx ? " active" : ""}`}
                    onClick={e => {
                      e.stopPropagation();
                      onFileSelect(idx, fIdx);
                    }}
                  >
                    {file.type === "info" ? "📝" : "📄"} {file.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}