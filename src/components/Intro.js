import React, { useEffect, useRef } from "react";
import "../styles/Intro.css";
import FadeInSection from "./FadeInSection";
import AnimatedRobot from "./AnimatedRobot";
import { FiMail } from "react-icons/fi"; 
import Typist from "react-typist";
import { gsap } from "gsap";

const Intro = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Animate the windmill cursor
    gsap.to(cursorRef.current.querySelector('svg'), {
      rotation: 360,
      repeat: -1,
      duration: 10,
      ease: "none",
      transformOrigin: "center center"
    });

  }, []);

  return (
    <div className="intro-section">
      <div className="intro-content">
        <div className="typist-content">
          <Typist 
            avgTypingDelay={70}
            stdTypingDelay={25}
            cursor={{
              show: false, // Hide default cursor since we have our custom one
              blink: true,
              element: '|'
            }}
          >   
            <span className="intro-title">Hello there! I'm </span>
            <span className="intro-name">Rafsan.</span>
            <span>&nbsp;</span>
            <Typist.Delay ms={300} />
          </Typist>
          
          <div 
            ref={cursorRef} 
            id="custom-cursor" 
            className="windmill-cursor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 248 248" aria-hidden="true">
              <path fill="url(#windmill-gradient-1)" d="M152.266 123.716h94.275c.802 0 1.459.656 1.459 1.459v121.067c0 .81-.664 1.474-1.474 1.466-67.274-.78-121.669-55.137-122.522-122.387v121.22c0 .803-.657 1.459-1.46 1.459H1.474c-.81 0-1.474-.664-1.467-1.474C.795 178.721 56 124.008 123.996 124H1.459C.657 124 0 123.344 0 122.541V1.474C0 .664.664 0 1.474.008c67.274.78 121.669 55.137 122.522 122.387V1.46c0-.803.657-1.46 1.46-1.46h121.07c.81 0 1.474.664 1.467 1.474-.679 58.224-41.486 106.801-96.055 119.367-1.686.386-1.401 2.875.336 2.875h-.008Z"></path>
              <path fill="url(#windmill-gradient-2)" d="M152.266 123.716h94.275c.802 0 1.459.656 1.459 1.459v121.067c0 .81-.664 1.474-1.474 1.466-67.274-.78-121.669-55.137-122.522-122.387v121.22c0 .803-.657 1.459-1.46 1.459H1.474c-.81 0-1.474-.664-1.467-1.474C.795 178.721 56 124.008 123.996 124H1.459C.657 124 0 123.344 0 122.541V1.474C0 .664.664 0 1.474.008c67.274.78 121.669 55.137 122.522 122.387V1.46c0-.803.657-1.46 1.46-1.46h121.07c.81 0 1.474.664 1.467 1.474-.679 58.224-41.486 106.801-96.055 119.367-1.686.386-1.401 2.875.336 2.875h-.008Z"></path>
              <defs>
                <linearGradient id="windmill-gradient-1" x1="218" x2="-47.283" y1="258" y2="153.706" gradientUnits="userSpaceOnUse">
                  <stop offset=".27" stopColor="#64D98A"></stop>
                  <stop offset=".838" stopColor="#ccd6f6"></stop>
                </linearGradient>
                <linearGradient id="windmill-gradient-2" x1="-21.183" x2="223.712" y1="-7.807" y2="329.472" gradientUnits="userSpaceOnUse">
                  <stop offset=".27" stopColor="#64D98A"></stop>
                  <stop offset=".838" stopColor="#ccd6f6"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <div className="intro-subtitle">
          I'm a <span className="intro-subtitle-name">Data Analyst</span> with a love for design.
        </div>
        
        <FadeInSection>
          <div className="intro-desc">
            I'm an aspiring Data Analyst based in Toronto, Canada. Passionate about using data to
            drive business decisions and innovation. Eager to leverage my skills in leading
            industries to create meaningful impact.
          </div>
        </FadeInSection>
        
        <FadeInSection>
          <div className="intro-buttons">
            <a href="#contact" className="outline-button">Get In Touch <FiMail className="button-icon" /></a>
          </div>
        </FadeInSection>
      </div>
      
      <div className="intro-animation">
        <AnimatedRobot />
      </div>
    </div>
  );
};

export default Intro;