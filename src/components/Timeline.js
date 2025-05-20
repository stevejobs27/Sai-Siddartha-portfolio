import React, { useRef, useEffect, useState } from "react";
import FadeInSection from "./FadeInSection";
import "../styles/Timeline.css";

const milestones = [
  {
    title: "Master's at TMU",
    description: "Graduated with a Master of Engineering in Innovation & Entrepreneurship at Toronto Metropolitan University.",
    year: "2023"
  },
  {
    title: "Startup Projects",
    description: "Discovered data analytics through startup projects with Reflect, ShieldMate, and HealthMate.",
    year: "2023"
  },
  {
    title: "Career Decision",
    description: "Decided to pursue a career in tech and data analytics.",
    year: "2023"
  },
  {
    title: "Google Data Analytics Certification",
    description: "Started my journey with the Google Data Analytics Professional Certificate.",
    year: "2023"
  },
  {
    title: "Project Journey",
    description: "Worked on many projects using tools like Python, SQL, Tableau, and more.",
    year: "2024"
  }
];


// Layout constants
const WIDTH = 1000;
const HEIGHT = 750;
const PIPE_X = WIDTH / 2;
const PIPE_TOP = 80;
const PIPE_SPACING = 150;
const BRANCH_LENGTH = 90;
const EVENT_WIDTH = 350;
const EVENT_HEIGHT = 100;

export default function Timeline() {
  const pathRef = useRef(null);
  const [dotPos, setDotPos] = useState({ x: PIPE_X, y: PIPE_TOP });
  const [activeIndex, setActiveIndex] = useState(0);

  // Points for milestones and branches
  const points = milestones.map((_, idx) => ({
    x: PIPE_X,
    y: PIPE_TOP + idx * PIPE_SPACING
  }));
  const branchEnds = milestones.map((_, idx) => {
    const isLeft = idx % 2 === 0;
    return {
      x: isLeft ? PIPE_X - BRANCH_LENGTH : PIPE_X + BRANCH_LENGTH,
      y: PIPE_TOP + idx * PIPE_SPACING
    };
  });

  // SVG path for the pipe
  const pathD = `M${PIPE_X},${PIPE_TOP} V${PIPE_TOP + (milestones.length - 1) * PIPE_SPACING}`;

  // Interactive dot logic
  useEffect(() => {
    function handleScroll() {
      const section = document.querySelector(".timeline-section");
      if (!section || !pathRef.current) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const centerY = windowH / 2 - rect.top;
      const minY = PIPE_TOP;
      const maxY = PIPE_TOP + (milestones.length - 1) * PIPE_SPACING;
      const clampedY = Math.max(minY, Math.min(maxY, centerY));

      // Find the closest milestone
      let closest = 0;
      let minDist = Infinity;
      points.forEach((pt, idx) => {
        const dist = Math.abs(pt.y - clampedY);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setDotPos({ x: PIPE_X, y: clampedY });
      setActiveIndex(closest);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [points]);

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">Timeline</span>
      </div>
      <div className="timeline-section timeline-section-large">
        <svg
          className="timeline-pipe-svg"
          width={WIDTH}
          height={HEIGHT}
        >
          {/* Pipe */}
          <path
            ref={pathRef}
            d={pathD}
            className="timeline-pipe"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Branches */}
          {points.map((pt, idx) => (
            <line
              key={idx}
              x1={pt.x}
              y1={pt.y}
              x2={branchEnds[idx].x}
              y2={branchEnds[idx].y}
              className="timeline-branch"
            />
          ))}
          {/* Milestone dots */}
          {branchEnds.map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              className={`timeline-milestone-dot${activeIndex === idx ? " active" : ""}`}
            />
          ))}
          {/* Big moving dot */}
          <circle
            cx={dotPos.x}
            cy={dotPos.y}
            className="timeline-big-dot"
          />
        </svg>
        <ul className="timeline-list">
          {milestones.map((item, idx) => {
            const pt = branchEnds[idx];
            const isLeft = idx % 2 === 0;
            const style = {
              top: pt.y - (EVENT_HEIGHT / 2),
              left: isLeft
                ? `${pt.x - EVENT_WIDTH}px`
                : `${pt.x}px`
            };
            return (
              <FadeInSection key={item.title}>
                <li
                  className={`timeline-item${activeIndex === idx ? " active" : ""} ${isLeft ? "left" : "right"}`}
                  style={style}
                >
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-desc">{item.description}</div>
                </li>
              </FadeInSection>
            );
          })}
        </ul>
      </div>
    </div>
  );
}