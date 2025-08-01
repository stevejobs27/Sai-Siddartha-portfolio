import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FcGraduationCap, FcIdea, FcBriefcase, FcGoogle, FcAcceptDatabase, FcStatistics } from "react-icons/fc";
import "../styles/Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "B.Tech in New Horizon College Of Engineering",
    description: "Pursued a Bachelor of Technology degree focused on Information Science and Engineering, gaining comprehensive knowledge and practical skills in areas such as , algorithms, database management, software development, and Machine Learning.",
    year: "July 2019 - july 2023",
    type: "education" 
  },
  {
    title: "Exposure to Data during my Internship",
    description: "During my time at NHCE, I worked at an Ed Tech company called Teachnook where I gained initial exposure to  data during market research, which introduced me to the power of data analytics in decision making.",
    year: "March 2023 - April 2023",
    type: "startup",
    learnMoreLink: "#experience", 
    learnMoreText: "View Experience"
  },
  {
    title: "Decision to Pivot to Data Analytics",
    description: "Realized my passion for data analytics and decided to pivot my career towards becoming a Data Analyst, focusing on data-driven decision making.",
    year: "April 2024 - May 2024",
    type: "career",
  },
  {
    title: "Data Analyst Bootcamp ",
    description: "Completed Data Analytics Bootcamp by Alex the Analyst, establishing core competencies in data preparation, analysis, and visualization.",
    certificateUrl: "assets/Data Analytics Bootcamp Certification of Completion .png",
    year: "May 2024 - Dec 2024",
    type: "Training",

  },
  {
    title: "First Data Projects",
    description: "Developed my first data projects, applying skills in SQL, Power BI, and Python to analyze datasets and create visualizations.",
    year: "Nov 2024 - Dec 2024",
    type: "project"
  },
  {
    title: "Advanced Data Analysis & Storytelling",
    description: "Deepened my skills in advanced data analysis techniques, delving deeper into advanced SQL queries,  and diving into Python to unlock even more powerful ways to explore, manipulate, and tell stories with data.",
    year: "Jan 2025 - Present",
    type: "Projects",
    learnMoreLink: "#projects",
    learnMoreText: "View Projects"
  }
];

export default function Timeline() {
  const timelineWrapRef = useRef(null);
  const timelineItemsRef = useRef([]);
  
  useEffect(() => {
    timelineItemsRef.current = timelineItemsRef.current.filter(Boolean);
    
    const ctx = gsap.context(() => {
      gsap.fromTo("#timeline .section-title", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#timeline .section-title",
            start: "top 90%",
            toggleActions: "restart none none reverse" 
          }
        }
      );
      
      gsap.fromTo("#timeline-progress-line", 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrapRef.current,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
      
      timelineItemsRef.current.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        const date = item.querySelector('.timeline-date');
        
        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%", 
            toggleActions: "restart none none reverse"
          }
        });
        
        itemTl.fromTo(content,
          { x: direction * 100, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power2.out" 
          }
        ).fromTo(dot,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3,
            ease: "back.out(1.7)" 
          },
          "-=0.3" 
        ).fromTo(date,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.3,
            ease: "power2.out" 
          },
          "-=0.2"
        );
      });
    });
    
    return () => ctx.revert();
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'education': return <FcGraduationCap className="timeline-icon" />;
      case 'startup': return <FcIdea className="timeline-icon" />;
      case 'career': return <FcBriefcase className="timeline-icon" />;
      case 'google': return <FcGoogle className="timeline-icon" />;
      case 'project': return <FcAcceptDatabase className="timeline-icon" />;
      case 'statistics': return <FcStatistics className="timeline-icon" />;
      default: return null;
    }
  };

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">My Journey to Data</span>
      </div>
      
      <div className="timeline-wrapper" ref={timelineWrapRef}>
        <div className="timeline-progress">
          <div id="timeline-progress-line"></div>
        </div>
        
        <div className="timeline-items">
          {milestones.map((item, idx) => (
            <div 
              key={idx} 
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              ref={el => timelineItemsRef.current[idx] = el}
            >
              <div className="timeline-dot">
                {renderIcon(item.type)}
              </div>
              
              <div className="timeline-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                
                <div className="timeline-actions">
                  {item.certificateUrl && (
                    <a href={item.certificateUrl} className="timeline-link" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  )}
                  
                  {item.learnMoreLink && (
                    <a href={item.learnMoreLink} className="timeline-link">
                      {item.learnMoreText}
                    </a>
                  )}
                </div>
              </div>
              <span className="timeline-date">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}