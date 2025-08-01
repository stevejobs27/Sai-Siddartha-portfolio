import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icons";
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
              Hi, my name is Sai Siddartha and I enjoy fiddling with numbers and solving problems. My interest in data started back in 2024.
              The subtle realization of the power of data was all it took to get me hooked on the field of data analytics. 
          </p>
          
          <p ref={el => textRefs.current[1] = el}>
            Since then, I’ve earned a <a href= "assets/Data Analytics Bootcamp Certification of Completion .png" target="_blank"> Data Analytics Certificate</a> and built a strong foundation in <span className="highlight">SQL, Power BI, Excel and Python</span>.   For me, data analysis feels like playing detective—piecing together clues from numbers to reveal the bigger picture.
          </p>
          
          <p ref={el => textRefs.current[2] = el}>
            I have a strong appetite for learning and I'm always eager to explore new technologies.
          </p>
          
          <p ref={el => textRefs.current[3] = el}>
            Outside of work, I love walking. I'm also into reading books and solo trips.
          </p>
          
        </div>
        <p className="about-timeline-link" ref={el => textRefs.current[5] = el}>
          <a href="#timeline">
            <span role="img" aria-label="timeline">🗺️ </span> 
            View my <span className="about-timeline-highlight">timeline</span> to learn more about my unique journey into data &rarr;
          </a>
        </p>     
        <div className="about-actions" ref={el => textRefs.current[6] = el}>
          <a href="#contact" className="resume-button btn-effect">
            Get in Touch <Icon name="Mail" className="button-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;