import React, { useEffect, useState, useRef } from "react";
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

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(Array(milestones.length).fill(false));
  const timelineRef = useRef(null);
  const dotRef = useRef(null);
  const eventRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    eventRefs.current = eventRefs.current.slice(0, milestones.length);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !dotRef.current) return;
      
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate relative scroll position
      const scrollProgress = (viewportHeight / 2 - timelineTop) / timelineHeight;
      const boundedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Set dot position
      const dotPosition = boundedProgress * timelineHeight;
      dotRef.current.style.top = `${dotPosition}px`;
      
      // Find active milestone
      const milestoneCount = milestones.length;
      const newActiveIndex = Math.min(
        milestoneCount - 1,
        Math.max(0, Math.floor(boundedProgress * milestoneCount))
      );
      
      setActiveIndex(newActiveIndex);
      
      // Check which items are visible (animation logic)
      const newVisibleItems = [...visibleItems];
      eventRefs.current.forEach((eventRef, index) => {
        if (eventRef) {
          const rect = eventRef.getBoundingClientRect();
          // Item is visible if it's within 75% of the viewport height
          if (rect.top <= window.innerHeight * 0.75 && !newVisibleItems[index]) {
            newVisibleItems[index] = true;
          }
        }
      });
      
      if (JSON.stringify(newVisibleItems) !== JSON.stringify(visibleItems)) {
        setVisibleItems(newVisibleItems);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger initial check after a small delay to ensure DOM is ready
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems]);

  // Calculate position for markers and events
  const getMarkerPosition = (index) => {
    return `${index * (100 / (milestones.length - 1))}%`;
  };

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">Timeline</span>
      </div>
      
      <div className="timeline-container" ref={timelineRef}>
        {/* Timeline bar with moving dot */}
        <div className="timeline-bar">
          <div className="timeline-dot" ref={dotRef}></div>
          
          {/* Fixed markers on the timeline */}
          {milestones.map((_, idx) => (
            <div
              key={`marker-${idx}`}
              className={`timeline-marker ${activeIndex === idx ? 'active' : ''}`}
              style={{ top: getMarkerPosition(idx) }}
            />
          ))}
        </div>
        
        {/* Timeline events */}
        <div className="timeline-events">
          {milestones.map((item, idx) => {
            const isLeft = idx % 2 === 0; // Even indices on left, odd on right
            const isActive = idx === activeIndex;
            const isVisible = visibleItems[idx];
            
            return (
              <div 
                key={idx}
                ref={el => eventRefs.current[idx] = el}
                className={`timeline-event ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}
                style={{ top: getMarkerPosition(idx) }}
              >
                <div className={`timeline-content ${isVisible ? 'bounce-in' : 'is-hidden'}`}>
                  <h3 className="timeline-title">{item.title}</h3>
                  <div className="timeline-year">{item.year}</div>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}