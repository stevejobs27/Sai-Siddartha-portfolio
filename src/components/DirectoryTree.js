import React, { useState } from "react";
import {
  VscFolder, VscFolderOpened, VscMarkdown, VscChevronDown, VscChevronRight
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

  // Unified handler: toggles open/close on any folder element click
  const handleToggleOrSelect = idx => {
    if (!openFolders[idx]) {
      // If closed, open and select README.md (or first file)
      setOpenFolders(prev => ({ ...prev, [idx]: true }));
      const readmeIdx = getReadmeIdx(projects[idx].files);
      onFileSelect(idx, readmeIdx);
    } else if (selectedProjectIdx === idx) {
      // If open and already selected, close it
      setOpenFolders(prev => ({ ...prev, [idx]: false }));
    } else {
      // If open but not selected, just select it
      const readmeIdx = getReadmeIdx(projects[idx].files);
      onFileSelect(idx, readmeIdx);
    }
  };

  return (
    <ul className="directory-tree">
      {projects.map((project, idx) => (
        <li key={idx}>
          <div
            className={`directory-folder${openFolders[idx] ? " open" : ""}`}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={e => {
              e.stopPropagation();
              handleToggleOrSelect(idx);
            }}
          >
            <span
              onClick={e => {
                e.stopPropagation();
                handleToggleOrSelect(idx);
              }}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              {openFolders[idx]
                ? <VscChevronDown style={{ marginRight: 2, verticalAlign: "middle", fontSize: 15, flexShrink: 0 }} />
                : <VscChevronRight style={{ marginRight: 2, verticalAlign: "middle", fontSize: 15, flexShrink: 0 }} />}
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                handleToggleOrSelect(idx);
              }}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              {openFolders[idx]
                ? <VscFolderOpened style={{ marginRight: 6, verticalAlign: "middle", color: "#64D98A", fontSize: 15, flexShrink: 0 }} />
                : <VscFolder style={{ marginRight: 6, verticalAlign: "middle", color: "#8da1b9", fontSize: 15, flexShrink: 0 }} />}
            </span>
            <span>{project.name}</span>
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
                    {getFileIcon(file)}
                    {file.name}
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