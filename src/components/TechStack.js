import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/TechStack.css";
import { RiFileExcel2Fill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { 
  SiMysql, SiPostgresql, SiTableau, SiPython, 
  SiPandas, SiNumpy, SiJupyter,
  SiR, SiGit, SiFigma,
  SiAdobeillustrator, SiAdobephotoshop
} from "react-icons/si";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Simplified tech stack data - just a flat array of tools
const techStackData = [
  { name: "MySQL", icon: <SiMysql />, color: "#00758F" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { name: "Excel", icon: <RiFileExcel2Fill />, color: "#217346" },
  { name: "Tableau", icon: <SiTableau />, color: "#E97627" },
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "Pandas", icon: <SiPandas />, color: "#150458" },
  { name: "NumPy", icon: <SiNumpy />, color: "#013243" },
  { name: "R", icon: <SiR />, color: "#276DC3" },
  { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
  { name: "Git", icon: <SiGit />, color: "#F05032" },
  { name: "Jupyter", icon: <SiJupyter />, color: "#F37626" },
  { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
  { name: "Illustrator", icon: <SiAdobeillustrator />, color: "#FF9A00" },
  { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF" },
];

export default function TechStack() {
  const techStackRef = useRef(null);
  
  useEffect(() => {
    console.log("TechStack component mounted");
    
    // Calculate grid dimensions
    const totalItems = techStackData.length;
    const cols = 2; 
    const rows = Math.ceil(totalItems / cols);
    const grid = [rows, cols];
    
    console.log("TechStack grid dimensions:", grid);
    
    gsap.set(".tech-icon-container", { opacity: 1, scale: 1 });
    
    gsap.fromTo(".tech-title",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#tech-stack",
          start: "top 90%",
          toggleActions: "play none none reverse" // Animate out when scrolling away
        }
      }
    );

    // Animation for tech icons with reverse on scroll away
    gsap.fromTo(".tech-icon-container",
      {
        scale: 0.1,
        y: -250,
        opacity: 0
      },
      {
        y: 0,
        scale: 1,
        duration: 0.5,
        opacity: 1,
        stagger: {
        grid: [7,15],
        from: "center",
        amount: 1 ,
      },
        ease: "power1.inOut", 
        scrollTrigger: {
          trigger: "#tech-stack",
          start: "top 70%",
          toggleActions: "play none none reverse" // Animate out when scrolling away
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle icon hover - using native tooltip
  const handleIconHover = (e, enter) => {
    const target = e.currentTarget;
    
    if (enter) {
      gsap.to(target, {
        y: -5,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(target.querySelector('.tech-icon'), {
        color: "var(--green-bright)",
        duration: 0.3
      });
    } else {
      gsap.to(target, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(target.querySelector('.tech-icon'), {
        color: target.dataset.color,
        duration: 0.3
      });
    }
  };

  return (
    <section id="tech-stack" ref={techStackRef}>
      <div className="section-header">
        <span className="section-title tech-title">Tech Stack</span>
      </div>
      
      <div className="tech-grid-container">
        {techStackData.map((tool, index) => (
          <div
            key={tool.name}
            className="tech-icon-container"
            data-color={tool.color}
            title={tool.name} // Add tooltip using HTML title attribute
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          >
            <div className="tech-icon" style={{ color: tool.color }}>
              {tool.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}