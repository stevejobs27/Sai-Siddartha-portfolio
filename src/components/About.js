import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const textRefs = useRef([]);
  
  useEffect(() => {
    gsap.fromTo(".about-title",
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
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.from(textRefs.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" ref={aboutRef}>
      <div className="section-header">
        <span className="section-title about-title">About Me</span>
      </div>
      
      <div className="about-content">
        <div className="about-description">
          <p ref={el => textRefs.current[0] = el}>
            I am an aspiring <span className="highlight">Data Analyst</span> exploring the field through hands-on
            <a href="#projects"> projects</a>. 
            Recently, I completed my graduation in Master of Engineering in Innovation & Entrepreneurship at{" "}
            <a href="https://www.torontomu.ca/">Toronto Metropolitan University</a> where working with startups on market 
            research and product development completely made me fall in love with the power of data.
          </p>
          
          <p ref={el => textRefs.current[1] = el}>
            My analytical journey is driven by a passion for transforming raw data into meaningful insights that drive decisions. 
            I've been developing expertise in <span className="highlight">SQL</span>, <span className="highlight">Python</span>, 
            <span className="highlight">Tableau</span>, and various data analysis tools to build a solid foundation in the field.
          </p>
          
          <p ref={el => textRefs.current[2] = el}>
            Although unrelated, I also have a background in <span className="highlight">Graphic Design</span> which helps me create visually appealing and intuitive data visualizations.
          </p>
          
          <p ref={el => textRefs.current[3] = el}>
            Outside of work, I'm interested in cool tech products, aesthetic decor, playing video games and watching soccer.
          </p>
        </div>
        <p className="about-timeline-link" ref={el => textRefs.current[5] = el}>
          <a href="#timeline">
            <span role="img" aria-label="timeline">🗺️</span> 
            View my <span className="about-timeline-highlight">timeline</span> to learn more about my unique journey into data &rarr;
          </a>
        </p>     
        <div className="about-actions" ref={el => textRefs.current[6] = el}>
          <a href="/resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;