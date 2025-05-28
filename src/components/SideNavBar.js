import React from "react";
import Icon from './icons/icon';
import "../styles/SideNavBar.css";

export default function SideNavBar({ showStars, setShowStars }) {
  return (
    <div className="side-navbar">
      <a href="https://github.com/rafsanahmed28" title="GitHub" target="_blank" rel="noopener noreferrer">
        <Icon name="GitHub" />
      </a>
      <a href="https://www.linkedin.com/in/rafsanahmed28/" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <Icon name="Linkedin" />
      </a>
      <a href="https://medium.com/@rafsanahmed2828" title="Medium" target="_blank" rel="noopener noreferrer">
        <Icon name="Medium" />
      </a>
      <a href="mailto:rafsanahmed2828@gmail.com" title="Email" target="_blank" rel="noopener noreferrer">
        <Icon name="Email" />
      </a>
      <div className="side-navbar-divider"></div>
      <button
        className={`star-btn${showStars ? " star-active" : ""}`}
        onClick={() => setShowStars((prev) => !prev)}
        title={showStars ? "Disable Background" : "Enable Background"}
        type="button">
        <Icon name="Power" />
      </button>
    </div>
  );
}
