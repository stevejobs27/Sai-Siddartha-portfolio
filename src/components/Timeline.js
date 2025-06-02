import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FcGraduationCap, FcIdea, FcBriefcase, FcGoogle, FcAcceptDatabase, FcStatistics } from "react-icons/fc";
import "../styles/Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "It All Started when I was Born",
    description: "Completed my Master of Engineering at TMU, where I first discovered the power of data through market research and analytics projects.",
    year: "Sep 2022",
    type: "education" 
  },
  {
    title: "Exposure to Data in Startup Environments",
    description: "Worked at 3 different startups where I gained initial exposure to huge amounts of data during market research, focusing on customer insights and market trends.",
    year: "Till 2023",
    type: "startup",
    learnMoreLink: "#projects", 
    learnMoreText: "View Projects"
  },
  {
    title: "Decision to Pivot to Data Analytics",
    description: "Realized my passion for data analytics and decided to pivot my career towards becoming a Data Analyst, focusing on data-driven decision making.",
    year: "Early 2024",
    type: "career",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    description: "Completed Google's Data Analytics Professional Certificate, establishing core competencies in data preparation, analysis, and visualization.",
    certificateUrl: "https://www.coursera.org/account/accomplishments/professional-cert/23OIJ3BGH8FJ",
    year: "Early 2024",
    type: "google",

  },
  {
    title: "First Data Projects",
    description: "Built my first portfolio projects, analyzing real-world datasets and creating visualizations with Tableau and Python libraries.",
    year: "Sep 2024",
    type: "project"
  },
  {
    title: "Advanced Data Analysis & Storytelling",
    description: "Deepened my skills in advanced data analysis techniques, focusing on transforming raw data into compelling narratives that drive business decisions.",
    year: "Present",
    type: "statistics",
    learnMoreLink: "#contact",
    learnMoreText: "Get In Touch"
  }
];

export default function Timeline() {
  const timelineWrapRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);
  
  // Setup intersection observer to load items on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const itemIndex = parseInt(entry.target.dataset.index);
          if (!visibleItems.includes(itemIndex)) {
            setVisibleItems(prev => [...prev, itemIndex]);
          }
        }
      });
    }, { threshold: 0.2 });
    
    // Add dataset index to each item and observe them
    timelineItemsRef.current.forEach((item, index) => {
      if (item) {
        item.dataset.index = index;
        observer.observe(item);
      }
    });
    
    return () => {
      timelineItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, [visibleItems]);
  
  useEffect(() => {
    timelineItemsRef.current = [];
    
    const ctx = gsap.context(() => {
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineWrapRef.current,
          start: "top 95%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate the section title
      mainTimeline.fromTo("#timeline .section-title", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      
      gsap.fromTo("#timeline-progress-line", 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrapRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
      
      return () => {
        ctx.revert();
      };
    });
  }, []);
  
  useEffect(() => {
    visibleItems.forEach(index => {
      const item = timelineItemsRef.current[index];
      
      // Skip if item is already animated or doesn't exist
      if (!item || item.isAnimated) return;
      
      // Mark as animated to prevent re-animation
      item.isAnimated = true;
      
      const direction = index % 2 === 0 ? -1 : 1;
      const content = item.querySelector('.timeline-content');
      const dot = item.querySelector('.timeline-dot');
      
      // Create individual timeline for this item
      const itemTimeline = gsap.timeline();

      // Animate the content
      itemTimeline.fromTo(content,
        { 
          x: direction * 100, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    });
  }, [visibleItems]);

  const renderIcon = (type) => {
    switch (type) {
      case 'education':
        return <FcGraduationCap className="timeline-icon" />;
      case 'startup':
        return <FcIdea className="timeline-icon" />;
      case 'career':
        return <FcBriefcase className="timeline-icon" />;
      case 'google':
        return <FcGoogle className="timeline-icon" />;
      case 'project':
        return <FcAcceptDatabase className="timeline-icon" />;
      case 'statistics':
        return <FcStatistics className="timeline-icon" />;
      default:
        return null;
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
                    <a 
                      href={item.certificateUrl} 
                      className="timeline-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  )}
                  
                  {item.learnMoreLink && (
                    <a 
                      href={item.learnMoreLink} 
                      className="timeline-link"
                    >
                      {item.learnMoreText}
                    </a>
                  )}
                </div>
              </div> <span className="timeline-date">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}