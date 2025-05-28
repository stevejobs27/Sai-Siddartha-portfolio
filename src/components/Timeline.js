// Copyright (c) 2025 by CodyHouse (https://codepen.io/codyhouse/pen/OJgRvj)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. //

import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import "../styles/Timeline.css";

const milestones = [
  {
    title: "Master's at TMU",
    description: "Graduated with a Master of Engineering in Innovation & Entrepreneurship at Toronto Metropolitan University.",
    year: "2023",
    type: "education" 
  },
  {
    title: "Startup Projects",
    description: "Discovered data analytics through startup projects with Reflect, ShieldMate, and HealthMate.",
    year: "2023",
    type: "project"
  },
  {
    title: "Career Decision",
    description: "Decided to pursue a career in tech and data analytics.",
    year: "2023",
    type: "career"
  },
  {
    title: "Google Data Analytics Certification",
    description: "Started my journey with the Google Data Analytics Professional Certificate.",
    year: "2023",
    type: "education"
  },
  {
    title: "Project Journey",
    description: "Worked on many projects using tools like Python, SQL, Tableau, and more.",
    year: "2024",
    type: "project"
  }
];

export default function Timeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleAnimation = () => {
      if (!timelineRef.current) return;
      
      const timelineBlocks = timelineRef.current.querySelectorAll('.cd-timeline-block');
      
      timelineBlocks.forEach(block => {
        if (block.getBoundingClientRect().top > window.innerHeight * 0.75) {
          block.querySelector('.cd-timeline-img').classList.add('is-hidden');
          block.querySelector('.cd-timeline-content').classList.add('is-hidden');
        }
      });
      
      const handleScroll = () => {
        timelineBlocks.forEach(block => {
          if (
            block.getBoundingClientRect().top <= window.innerHeight * 0.75 && 
            block.querySelector('.cd-timeline-img').classList.contains('is-hidden')
          ) {
            block.querySelector('.cd-timeline-img').classList.remove('is-hidden');
            block.querySelector('.cd-timeline-img').classList.add('bounce-in');
            block.querySelector('.cd-timeline-content').classList.remove('is-hidden');
            block.querySelector('.cd-timeline-content').classList.add('bounce-in');
          }
        });
      };
      const positionTimelineLine = () => {
      if (!timelineRef.current) return;
      
      const timelineBlocks = timelineRef.current.querySelectorAll('.cd-timeline-block');
      if (timelineBlocks.length < 2) return;
      
      const firstDot = timelineBlocks[0].querySelector('.cd-timeline-img');
      const lastDot = timelineBlocks[timelineBlocks.length - 1].querySelector('.cd-timeline-img');
      
      const timelineLine = timelineRef.current;
      const firstDotRect = firstDot.getBoundingClientRect();
      const lastDotRect = lastDot.getBoundingClientRect();
      const timelineRect = timelineLine.getBoundingClientRect();
      
      const firstDotTop = firstDotRect.top - timelineRect.top + firstDotRect.height / 2;
      const lastDotBottom = lastDotRect.top - timelineRect.top + lastDotRect.height / 2;
      
      timelineLine.style.setProperty('--line-top', `${firstDotTop}px`);
      timelineLine.style.setProperty('--line-bottom', `${lastDotBottom}px`);
    };
  
    positionTimelineLine();
    window.addEventListener('scroll', handleScroll);
    handleScroll();
      
    return () => window.removeEventListener('scroll', handleScroll);
    };
    
    const timer = setTimeout(handleAnimation, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'education':
        return <FaGraduationCap className="timeline-icon" />;
      case 'project':
        return <FaLaptopCode className="timeline-icon" />;
      case 'career':
        return <BsBriefcaseFill className="timeline-icon" />;
      default:
        return null;
    }
  };

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">Timeline</span>
      </div>
      
      <section id="cd-timeline" className="cd-container" ref={timelineRef}>
        {milestones.map((item, idx) => (
          <div key={idx} className="cd-timeline-block">
            <div className={`cd-timeline-img cd-${item.type}`}>
              {renderIcon(item.type)}
            </div>

            <div className="cd-timeline-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="cd-date">{item.year}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}