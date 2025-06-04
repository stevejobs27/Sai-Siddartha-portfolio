import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../styles/Experience.css";

const experienceItems = {
  Reflect: {
    jobTitle: "Project Lead @",
    duration: "JAN 2023 - APR 2024",
    desc: [
      "Conducted 20+ customer interviews to understand user needs and pain points, translating insights into actionable business requirements and aligning product development with customer demands",
      "Successfully secured $13,000 in grant funding by winning both Stage 1 and Stage 2 of the Norman Esch Awards, validating the venture's impact and potential"
    ]
  },
  "ShieldMate INC.": {
    jobTitle: "Research Analyst @",
    duration: "MAR 2023 - DEC 2023",
    desc: [
      "Utilized analytical skills to conduct in-depth market research, identify key market needs and trends to inform the development process for the innovative startup that aims to address the underreporting of IPV",
      "Led the conceptualization and wireframing for the envisioned platform using Figma to guide app development and ensure maximum user satisfaction",
      "Collaborated with various stakeholders and firms to forge strategic partnerships to amplify the app's reach and impact"
    ]
  },
  HealthMate: {
    jobTitle: "Technical Lead @",
    duration: "SEP 2022 - FEB 2023",
    desc: [
      "Led prototyping and product development, using Bubble.io for a no-code platform and guiding the team through technical decisions",
      "Designed UI/UX assets in Figma and Adobe Illustrator to deliver a functional and user-friendly health tech interface"
    ]
  },
  "Doctor's": {
    jobTitle: "Executive Manager @",
    duration: "JAN 2022 - AUG 2022",
    desc: [
      "Spearheaded the implementation of ERP solutions to streamline inventory and warehouse management processes, optimizing efficiency and ensuring smooth operations within the company",
      "Acted as a technical expert, advising management on best practices and technologies to support business growth and scalability, demonstrating adaptability and a wide range of skills"
    ]
  },
  Fiverr: {
    jobTitle: "Graphic Designer @",
    duration: "MAY 2020 - OCT 2021",
    desc: [
      "Collaborated with clients to understand their target audience and develop designs that effectively conveyed the desired sentiment, resulting in increased product sales and customer satisfaction",
      "Leveraged graphic design skills and creativity to produce unique and compelling designs for global clients that stood out in the competitive Print-on-Demand market",
      "Effectively managed client expectations, deadlines, and project requirements, demonstrating strong communication and time management skills"
    ]
  }
};

const JobList = () => {
  const [value, setValue] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(window.innerWidth < 600);
  const keys = Object.keys(experienceItems);
  
  const contentRef = useRef(null);
  const listsRef = useRef({});
  const oldValueRef = useRef(value);
  
  useEffect(() => {
    const handleResize = () => {
      setIsHorizontal(window.innerWidth < 600);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleTabChange = (index) => {
    const oldIndex = oldValueRef.current;
    
    if (oldIndex === index) return;
    
    oldValueRef.current = index;
    
    const currentPanel = document.querySelector('.joblist-panel');
    
    if (currentPanel) {
      gsap.to(currentPanel, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setValue(index);
          animateJobDetails();
          
          const newPanel = contentRef.current.querySelector(`.joblist-panel:nth-child(${index + 1})`);
          if (newPanel) {
            gsap.fromTo(newPanel, { opacity: 0 }, { opacity: 1, duration: 0.3 });
          }
        }
      });
    } else {
      setValue(index);
      animateJobDetails();
    }
  };
  
  const animateJobDetails = () => {
    const listItems = contentRef.current?.querySelectorAll('.job-description li');
    
    if (listItems?.length) {
      gsap.set(listItems, { opacity: 0, x: 20 });
      
      gsap.to(listItems, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  };
  
  useEffect(() => {
    animateJobDetails();
  }, []);
  
  return (
    <div className={`joblist-root ${isHorizontal ? "horizontal" : "vertical"}`}>
      <div className={`joblist-tabs ${isHorizontal ? "horizontal" : "vertical"}`}>
        {keys.map((key, i) => (
          <button
            key={key}
            className={`joblist-tab${value === i ? " active" : ""}`}
            onClick={() => handleTabChange(i)}
          >
            {isHorizontal ? `0${i+1}.` : key}
          </button>
        ))}
      </div>
      
      <div className="joblist-content" ref={contentRef}>
        {keys.map((key, i) =>
          value === i ? (
            <div key={key} className="joblist-panel">
              <span className="joblist-job-title">
                {experienceItems[key]["jobTitle"] + " "}
              </span>
              <span className="joblist-job-company">{key}</span>
              <div className="joblist-duration">
                {experienceItems[key]["duration"]}
              </div>
              <ul className="job-description">
                {experienceItems[key]["desc"].map((descItem, j) => (
                  <li key={j}>{descItem}</li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default JobList;