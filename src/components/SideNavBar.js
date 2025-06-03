import React, { useRef, useEffect } from "react";
import Icon from "./Icons";
import "../styles/SideNavBar.css";
import { gsap } from "gsap";

export default function SideNavBar({ showStars, setShowStars }) {
  const sideNavRef = useRef(null);
  
  useEffect(() => {
    if (sideNavRef.current) {
      gsap.set(sideNavRef.current, {
        autoAlpha: 0,
        y: -10
      });
      
      gsap.to(sideNavRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.8
      });
    }
  }, []);
  
  return (
    <div className="side-navbar" ref={sideNavRef}>
      <a href="https://github.com/rafsanahmed28" title="GitHub" target="_blank" rel="noopener noreferrer">
        <Icon name="GitHub" className="sidenav-icon"/>
      </a>
      <a href="https://www.linkedin.com/in/rafsanahmed28/" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <Icon name="Linkedin" className="sidenav-icon"/>
      </a>
      <a href="https://medium.com/@rafsanahmed2828" title="Medium" target="_blank" rel="noopener noreferrer">
        <Icon name="Medium" className="sidenav-icon"/>
      </a>
      <a href="mailto:rafsanahmed2828@gmail.com" title="Email" target="_blank" rel="noopener noreferrer">
        <Icon name="Email" className="sidenav-icon"/>
      </a>
      <div className="side-navbar-divider"></div>
      <button
        className={`star-btn${showStars ? " star-active" : ""}`}
        onClick={() => setShowStars((prev) => !prev)}
        title={showStars ? "Disable Background" : "Enable Background"}
        type="button">
        <Icon name="Star" />
      </button>
    </div>
  );
}