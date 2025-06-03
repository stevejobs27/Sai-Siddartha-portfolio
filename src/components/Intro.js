import React, { useEffect, useRef } from "react";
import "../styles/Intro.css";
import AnimatedRobot from "./AnimatedRobot";
import { FiMail } from "react-icons/fi"; 
import Typist from "react-typist";
import { gsap } from "gsap";

const Intro = ({ onTypingDone }) => {
  const cursorRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Create a timeline for sequential animations
    const tl = gsap.timeline();
    
    // Set initial states (everything hidden except the typing content)
    gsap.set([subtitleRef.current, descRef.current, buttonsRef.current], {
      opacity: 0,
      y: 20
    });
    
    gsap.set(animationRef.current, {
      opacity: 0,
      scale: 0.95
    });
    
    // STEP 1: Wait for typing to complete (2.5s)
    // STEP 2: First reveal the robot design
    tl.to(animationRef.current, {
      opacity: 1, 
      scale: 1, 
      duration: 0.8, 
      ease: "power2.out",
      delay: 2.5 // Wait for typing to complete
    });
    
    // STEP 3: Then reveal the subtitle
    tl.to(subtitleRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.25, 
      ease: "power2.out"
    },);
    
    // STEP 4: Then reveal the description
    tl.to(descRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.25, 
      ease: "power2.out"
    },);
    
    // STEP 5: Finally reveal the button
    tl.to(buttonsRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.25, 
      ease: "power2.out"
    },);

  // Windmill Animation Stuff
  const windmill = cursorRef.current.querySelector('svg');

  // First fast spinning
  gsap.to(windmill, {
    rotation: 360 * 4, 
    duration: 2,
    ease: "linear",
    transformOrigin: "center center",
    onComplete: () => {
      // When fast spin completes, transition to slow continuous spin
      // WITHOUT resetting to 0
      gsap.to(windmill, {
        rotation: "+=720", // Add 2 more rotations as it slows down
        duration: 3, 
        ease: "power2.out", 
        transformOrigin: "center center",
        onComplete: () => {
          // Final continuous slow rotation
          gsap.to(windmill, {
            rotation: "+=360",
            repeat: -1,
            duration: 2, 
            ease: "power1.in",
            transformOrigin: "center center"
          });
        }
      });
    }
  });
  }, []);

  return (
    <div className="intro-section">
      <div className="intro-content" ref={contentRef}>
        <div className="typist-content">
          <Typist
            avgTypingDelay={70}
            stdTypingDelay={25}
            cursor={{
              show: false,
              blink: true,
              element: '|'
            }}
            onTypingDone={onTypingDone}
          >
            <span className="intro-title">Hi there! I'm </span>
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
                  <stop offset=".838" stopColor="#e2e8fd"></stop>
                </linearGradient>
                <linearGradient id="windmill-gradient-2" x1="-21.183" x2="223.712" y1="-7.807" y2="329.472" gradientUnits="userSpaceOnUse">
                  <stop offset=".27" stopColor="#64D98A"></stop>
                  <stop offset=".838" stopColor="#e2e8fd"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="intro-subtitle" ref={subtitleRef}>
          A <span className="intro-subtitle-name">Data Analyst</span> with a love for design.
        </div>
        
        <div className="intro-desc" ref={descRef}>
          I'm a techie who loves working with numbers and graphics. I thrive on solving problems using analytical skills and
          creating powerful and insightful visualizations.
        </div>
        
        <div className="intro-buttons" ref={buttonsRef}>
          <a href="#contact" className="outline-button btn-effect">Get In Touch <FiMail className="button-icon" /></a>
        </div>
      </div>
      
      <div className="intro-animation" ref={animationRef}>
        <AnimatedRobot />
      </div>
    </div>
  );
};

export default Intro;