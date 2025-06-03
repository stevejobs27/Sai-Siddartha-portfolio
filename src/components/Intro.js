import React, { useEffect, useRef } from "react";
import "../styles/Intro.css";
import AnimatedRobot from "./AnimatedRobot";
import { FiMail } from "react-icons/fi"; 
import { gsap } from "gsap";

const Intro = ({ onTypingDone }) => {
  const cursorRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const hasRunRef = useRef(false); 

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    
    const mainTl = gsap.timeline({
      onComplete: () => {
        if (onTypingDone) onTypingDone();
      }
    });
    
    gsap.set([subtitleRef.current, descRef.current, buttonsRef.current], {
      opacity: 0,
      y: 20
    });
    
    gsap.set(animationRef.current, {
      opacity: 0,
      scale: 0.95
    });

    const introText = textRef.current.textContent;
    const nameText = nameRef.current.textContent;
    
    textRef.current.textContent = "";
    nameRef.current.textContent = "";
    
    const introChars = introText.split("").map(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      textRef.current.appendChild(span);
      return span;
    });
    
    const nameChars = nameText.split("").map(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      nameRef.current.appendChild(span);
      return span;
    });
    
    const allChars = [...introChars, ...nameChars];
    
    const windmill = cursorRef.current.querySelector('svg');
    
    gsap.set(cursorRef.current, {
      opacity: 1,
      left: -10, 
      top: "50%",
      xPercent: 0,
      yPercent: -50
    });
    
    const typingTl = gsap.timeline();
    
    gsap.to(windmill, {
      rotation: 360 * 7.5,
      duration: 3,
      ease: "linear",
      repeat: -1,
      transformOrigin: "center center"
    });
    
    allChars.forEach((char, index) => {
      const charRect = char.getBoundingClientRect();
      const charWidth = char.offsetWidth || 10;
      
      typingTl.to(cursorRef.current, {
        left: `+=${charWidth}`,
        duration: 0.08, 
        ease: "none",
        onStart: () => {
          gsap.to(char, {
            opacity: 1,
            duration: 0.1
          });
        }
      });
    });
    
    typingTl.to(cursorRef.current, {
      left: "+=20",
      duration: 0.1,
      ease: "power1.out"
    });
    
    typingTl.add(() => {
      gsap.killTweensOf(windmill);
      
      gsap.to(windmill, {
        rotation: "+=385", 
        duration: .9,
        ease: "power2.Out",
        transformOrigin: "center center"
      });
    });
    
    mainTl.add(typingTl);

    
    
    mainTl.to(animationRef.current, {
      opacity: 1, 
      scale: 1, 
      duration: 0.8, 
      ease: "power2.out"
    });
    
    mainTl.to(subtitleRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.2, 
      ease: "power2.out"
    });
    
    mainTl.to(descRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.2, 
      ease: "power2.out"
    });
    
    mainTl.to(buttonsRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.2, 
      ease: "power2.out"
    });
    
    return () => {
      mainTl.kill();
      typingTl.kill();
      gsap.killTweensOf(windmill);
      gsap.killTweensOf(cursorRef.current);
      allChars.forEach(char => {
        gsap.killTweensOf(char);
      });
    };
  }, [onTypingDone]);

  return (
    <div className="intro-section">
      <div className="intro-content" ref={contentRef}>
        <div className="typist-content" ref={textContainerRef}>
          <div className="text-typing-container" style={{ position: "relative" }}>
            <span className="intro-title" ref={textRef}>Hi there! I'm </span>
            <span className="intro-name" ref={nameRef}>Rafsan.</span>
            
            <div 
              ref={cursorRef} 
              id="custom-cursor" 
              className="windmill-cursor"
              style={{ position: "absolute", pointerEvents: "none" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 248 248" aria-hidden="true">
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