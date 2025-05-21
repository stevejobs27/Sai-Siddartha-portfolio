import React, { useRef, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
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
const PIPE_X = WIDTH / 2;
const PIPE_TOP = 80;
const PIPE_SPACING = 150;
const BRANCH_LENGTH = 90;
const EVENT_WIDTH = 350;
const EVENT_HEIGHT = 100;

export default function Timeline() {
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const pathRef = useRef(null);
  const straightPathRef = useRef(null);
  const timelineListRef = useRef(null);
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [straightDotPos, setStraightDotPos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [svgHeight, setSvgHeight] = useState(750);

  // Zigzag points for milestones (desktop)
  const points = milestones.map((_, idx) => {
    const isLeft = idx % 2 !== 0;
    return {
      x: isLeft ? PIPE_X - BRANCH_LENGTH : PIPE_X + BRANCH_LENGTH,
      y: PIPE_TOP + idx * PIPE_SPACING
    };
  });

  // Straight points for milestones (mobile/tablet)
  const straightPoints = milestones.map((_, idx) => ({
    x: PIPE_X,
    y: PIPE_TOP + idx * PIPE_SPACING
  }));

  // Adjust SVG height to fit content
  useEffect(() => {
    if (timelineListRef.current) {
      setSvgHeight(timelineListRef.current.offsetHeight + 120); // 120 for padding
    }
  }, [milestones, isMobile]);

  // Rectangular zigzag path (desktop)
  let pathD = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    pathD += ` L${PIPE_X},${points[i].y}`;
    pathD += ` L${PIPE_X},${points[i + 1].y}`;
    pathD += ` L${points[i + 1].x},${points[i + 1].y}`;
  }

  // Straight path (mobile/tablet)
  let straightPathD = `M${PIPE_X},${straightPoints[0].y}`;
  for (let i = 1; i < straightPoints.length; i++) {
    straightPathD += ` L${PIPE_X},${straightPoints[i].y}`;
  }

  // Interactive dot logic for desktop
  useEffect(() => {
    if (isMobile) return;
    function handleScroll() {
      const section = document.querySelector(".timeline-section");
      if (!section || !pathRef.current) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrollY = windowH / 2 - rect.top;
      const pathLength = pathRef.current.getTotalLength();
      const minY = 0;
      const maxY = pathLength;
      const percent = Math.max(0, Math.min(1, scrollY / (rect.height || 1)));
      const length = minY + (maxY - minY) * percent;
      const pt = pathRef.current.getPointAtLength(length);
      setDotPos({ x: pt.x, y: pt.y });

      // Find closest milestone for highlight
      let closest = 0;
      let minDist = Infinity;
      points.forEach((p, idx) => {
        const dist = Math.hypot(pt.x - p.x, pt.y - p.y);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setActiveIndex(closest);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [points, isMobile]);

  // Interactive dot logic for mobile/tablet
  useEffect(() => {
    if (!isMobile) return;
    function handleScroll() {
      const section = document.querySelector(".timeline-section");
      if (!section || !straightPathRef.current) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrollY = windowH / 2 - rect.top;
      const pathLength = straightPathRef.current.getTotalLength();
      const minY = 0;
      const maxY = pathLength;
      const percent = Math.max(0, Math.min(1, scrollY / (rect.height || 1)));
      const length = minY + (maxY - minY) * percent;
      const pt = straightPathRef.current.getPointAtLength(length);
      setStraightDotPos({ x: pt.x, y: pt.y });

      // Find closest milestone for highlight
      let closest = 0;
      let minDist = Infinity;
      straightPoints.forEach((p, idx) => {
        const dist = Math.hypot(pt.x - p.x, pt.y - p.y);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setActiveIndex(closest);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [straightPoints, isMobile]);

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">Timeline</span>
      </div>
      <div className="timeline-section">
        {/* Desktop SVG */}
        {!isMobile && (
          <svg
            className="timeline-pipe-desktop"
            width={WIDTH}
            height={svgHeight}
          >
            {/* Rectangular Zigzag Path */}
            <path
              ref={pathRef}
              d={pathD}
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
            {/* Branches */}
            {points.map((pt, idx) => (
              <line
                key={idx}
                x1={PIPE_X}
                y1={pt.y}
                x2={pt.x}
                y2={pt.y}
              />
            ))}
            {/* Milestone dots, each associated with its event */}
            {milestones.map((item, idx) => (
              <a key={item.title} tabIndex={0} aria-label={item.title}>
                <circle
                  cx={points[idx].x}
                  cy={points[idx].y}
                  className={`timeline-milestone-dot${activeIndex === idx ? " active" : ""}`}
                  data-event-index={idx}
                />
              </a>
            ))}
            {/* Big moving dot */}
            <circle
              cx={dotPos.x}
              cy={dotPos.y}
              className="timeline-big-dot"
            />
          </svg>
        )}
        {/* Mobile/Tablet SVG */}
        {isMobile && (
          <svg
            className="timeline-pipe-mobile"
            width={WIDTH}
            height={svgHeight}
          >
            {/* Straight Pipe Path */}
            <path
              ref={straightPathRef}
              d={straightPathD}
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
            {/* Milestone dots, each associated with its event */}
            {milestones.map((item, idx) => (
              <a key={item.title} tabIndex={0} aria-label={item.title}>
                <circle
                  cx={straightPoints[idx].x}
                  cy={straightPoints[idx].y}
                  className={`timeline-milestone-dot${activeIndex === idx ? " active" : ""}`}
                  data-event-index={idx}
                />
              </a>
            ))}
            {/* Big moving dot */}
            <circle
              cx={straightDotPos.x}
              cy={straightDotPos.y}
              className="timeline-big-dot"
            />
          </svg>
        )}
        <ul className="timeline-list" ref={timelineListRef}>
          {milestones.map((item, idx) => {
            const pt = points[idx];
            const straightPt = straightPoints[idx];
            const isLeft = idx % 2 !== 0;
            const styleDesktop = {
              top: pt.y - (EVENT_HEIGHT / 2),
              left: isLeft
                ? `${pt.x - EVENT_WIDTH}px`
                : `${pt.x}px`
            };
            const styleMobile = {
              top: straightPt.y - (EVENT_HEIGHT / 2),
              left: `${straightPt.x}px`
            };
            return (
              <FadeInSection key={item.title}>
                <li
                  className={`timeline-item${activeIndex === idx ? " active" : ""} ${isLeft ? "left" : "right"}`}
                  style={isMobile ? styleMobile : styleDesktop}
                  data-dot-index={idx}
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