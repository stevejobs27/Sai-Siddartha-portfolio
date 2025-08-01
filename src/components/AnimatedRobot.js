// Copyright (c) 2025 by Shunya Koide (https://codepen.io/shunyadezain/pen/GRNEyZW)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. //

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "../styles/AnimatedRobot.css";
import { MorphSVGPlugin, DrawSVGPlugin } from "gsap/all";

export default function AnimatedRobot() {
  const svgRef = useRef();
  const robotTlRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin);
    
    let isLeft = false;

    gsap.set("#left-hand", {
      x: 30,
      transformOrigin: "right center"
    });
    gsap.set("#right-hand", {
      x: -30,
      transformOrigin: "left center"
    });

    const eyesTl = gsap
      .timeline({
        repeat: -1,
        repeatDelay: 1
      })
      .to(".eyes", {
        opacity: 0,
        duration: 0.1
      })
      .to(".eyes", {
        opacity: 1,
        duration: 0.1
      });

    const robotTl = gsap
      .timeline({
        repeat: -1
      })
      .to(
        "#robot",
        {
          x: 100,
          onStart: () => {
            isLeft = false;
          }
        },
        "right"
      )
      .to(
        "#faces",
        {
          x: -60
        },
        "right"
      )
      .to(
        "#left-hand",
        {
          x: 80
        },
        "right"
      )
      .to(
        "#charge",
        {
          scaleX: 0.8
        },
        "right"
      )
      .to("#right-hand", {
        rotation: 20,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut",
        duration: 0.4
      })
      .to(
        "#robot",
        {
          x: -100,
          onStart: () => {
            isLeft = true;
          }
        },
        "left"
      )
      .to(
        "#faces",
        {
          x: 60
        },
        "left"
      )
      .to(
        "#charge",
        {
          scaleX: 0.8
        },
        "left"
      )
      .to(
        "#left-hand",
        {
          x: 30
        },
        "left"
      )
      .to(
        "#right-hand",
        {
          x: -80
        },
        "left"
      )
      .to("#left-hand", {
        rotation: -20,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        duration: 0.4
      })
      .to(
        "#robot",
        {
          x: 0
        },
        "center"
      )
      .to(
        "#faces",
        {
          x: 0
        },
        "center"
      )
      .to(
        "#charge",
        {
          scaleX: 1
        },
        "center"
      )
      .to("#left-hand", {
        y: -50,
        x: -10,
        rotation: 30
      })
      .to("#left-hand", {
        rotation: 50,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut"
      })
      .to("#left-hand", {
        y: 0,
        x: 30,
        rotation: 0
      });
    
    // Store reference for pause/resume functionality
    robotTlRef.current = robotTl;
    robotTl.timeScale(0.8);

    // Main display
    // Left-top-circle
    gsap.set("#left-top-circle", {
      transformOrigin: "center",
      scale: 0
    });

    gsap.to("#left-top-circle", {
      transformOrigin: "center",
      scale: 1,
      fill: "#34496a",
      repeat: -1,
      duration: 2
    });

    // Graph-left-btm
    gsap.to(".graph-circle-lb", {
      rotation: 360,
      transformOrigin: "center",
      duration: 2,
      stagger: {
        amount: 1,
        ease: "sine.inOut",
        repeat: -1
      }
    });

    // Planet
    const planetTl = gsap
      .timeline({
        repeat: -1,
        yoyo: true
      })
      .set("#planet-circle", {
        rotation: 10,
        transformOrigin: "center"
      })
      .to("#planet-circle", {
        rotation: -10,
        transformOrigin: "center",
        ease: "power1.inOut"
      });

    // Circle-btm-graph
    gsap.to("#graph-cir-1", {
      rotation: 360,
      ease: "none",
      transformOrigin: "-9px center",
      duration: 3,
      repeat: -1
    });

    gsap.to("#graph-cir-2", {
      rotation: 360,
      ease: "none",
      transformOrigin: "center 18px",
      duration: 4,
      repeat: -1
    });

    gsap.to("#graph-cir-3", {
      rotation: 360,
      ease: "none",
      transformOrigin: "-19px center",
      duration: 5,
      repeat: -1
    });

    gsap.to("#graph-cir-mid-2", {
      scale: 1.5,
      ease: "sine.inOut",
      transformOrigin: "center",
      repeat: -1,
      yoyo: true
    });

    // These use MorphSVGPlugin
    gsap.to("#graph-left", {
      morphSVG: "#graph-morph1",
      repeat: -1,
      yoyo: true,
      ease: "elastic.out(1,0.8)",
      duration: 2
    });

    gsap.to("#graph-right", {
      morphSVG: "#graph-morph2",
      repeat: -1,
      yoyo: true,
      ease: "power3.inOut",
      duration: 1
    });

    // Top right circle
    gsap.to(".circles-top", {
      rotation: 360,
      duration: 10,
      transformOrigin: "center",
      stagger: {
        each: 0.5,
        ease: "none",
        repeat: -1
      }
    });

    // These use DrawSVGPlugin
    gsap.to("#circle-l", {
      drawSVG: "20",
      repeat: -1,
      yoyo: true,
      ease: "bounce.out",
      duration: 1
    });

    gsap.to("#circle-m", {
      drawSVG: "80 30",
      repeat: -1,
      yoyo: true,
      ease: "bounce.out",
      duration: 1.5
    });

    gsap.to("#circle-r", {
      drawSVG: "0",
      repeat: -1,
      yoyo: true,
      ease: "steps(12)",
      duration: 3
    });

    // Left Display
    gsap.to("#left-display-display", {
      y: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 2
    });
    gsap.to("#left-display-shadow", {
      scale: 1.1,
      transformOrigin: "center",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 2
    });

    // Song
    const songTl = gsap
      .timeline({
        repeat: -1
      })
      .to("#left-display-display line", {
        stroke: "#34496a",
        stagger: {
          each: 0.5
        }
      })
      .to("#left-display-display line", {
        stroke: "var(--green-bright)",
        stagger: {
          each: 0.5
        }
      });

     // MUSIC NOTES
    const existingNotes = document.querySelectorAll(".notes");
    existingNotes.forEach(note => {
      if (note.parentNode) {
        note.parentNode.removeChild(note);
      }
    });
    
    // Create music notes like in original code
    for (let i = 0; i < 3; i++) {
      let clone1 = document.querySelector("#note-1").cloneNode(true);
      let clone2 = document.querySelector("#note-2").cloneNode(true);
      
      clone1.id = `note-1-clone-${i}`;
      clone2.id = `note-2-clone-${i}`;
      
      clone1.classList.add("notes");
      clone2.classList.add("notes");
      
      gsap.set(clone1, {
        attr: {
          d: "M180 317l-3.5-3.8a1 1 0 00-1.7.7v8.1a6 6 0 00-2-.3c-2.5 0-4.6 1.6-4.6 3.5s2 3.5 4.7 3.5 4.6-1.5 4.6-3.5a3 3 0 00-.7-1.9v-6.8l1.7 1.8a1 1 0 101.5-1.4z",
          fill: "var(--green-bright)"
        },
        y: 40,
        opacity: 0
      });
      
      gsap.set(clone2, {
        attr: {
          d: "M203.4 323.4v-9.5a1 1 0 00-1-1h-9.3a1 1 0 00-1 1v8.1a6 6 0 00-2-.3c-2.5 0-4.6 1.6-4.6 3.5s2 3.5 4.7 3.5 4.6-1.5 4.6-3.5a2.9 2.9 0 00-.7-1.9V315h7.3v7.1a5.8 5.8 0 00-1.9-.3c-2.6 0-4.7 1.6-4.7 3.5s2.1 3.5 4.7 3.5 4.7-1.5 4.7-3.5a2.9 2.9 0 00-.8-1.8z",
          fill: "var(--green-bright)"
        },
        x: -10,
        y: 40,
        opacity: 0
      });
      
      svgRef.current.appendChild(clone1);
      svgRef.current.appendChild(clone2);
    }

    const notesAnimation = gsap.to(".notes", {
      y: gsap.utils.random(-50, -100, 10, true),
      x: gsap.utils.random(-50, 50, 25, true),
      opacity: 1,
      duration: gsap.utils.random(1.5, 3, 1.5, true),
      stagger: {
        each: 0.5,
        ease: "sine.in",
        repeat: -1
      },
      onRepeat: function() {
        gsap.set(".notes", {
          y: 40,
          x: gsap.utils.random(-10, 10, 5, true),
          opacity: 0
        });
      }
    });

    // Right Display
    gsap.to("#right-display-display", {
      y: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 2,
      delay: 1.5
    });
    gsap.to("#right-display-shadow", {
      scale: 1.1,
      transformOrigin: "center",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      duration: 2,
      delay: 1.5
    });

    // Graph lines
    gsap.to("#graph-line", {
      x: -105,
      ease: "none",
      repeat: -1,
      duration: 2
    });

    gsap.to("#bar-1-top", {
      morphSVG: "#bar-1-btm",
      repeat: -1,
      yoyo: true
    });
    gsap.to("#bar-2-top", {
      morphSVG: "#bar-2-btm",
      repeat: -1,
      yoyo: true,
      duration: 1.5
    });
    gsap.to("#bar-3-top", {
      morphSVG: "#bar-3-btm",
      repeat: -1,
      yoyo: true,
      duration: 2
    });

    // Buttons
    gsap.to("#btns ellipse", {
      fill: "#34496a",
      stagger: {
        amount: 1,
        grid: [4, 4],
        repeat: -1,
        yoyo: true,
        from: "random"
      }
    });

    // Mouse interaction
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / sizes.width) * 2 - 1;
      mouseY = -(e.clientY / sizes.height) * 2 + 1;

      gsap.to("#mid-display", {
        x: -mouseX * 10,
        y: mouseY * 10
      });

      gsap.to("#btm-display", {
        x: -mouseX * 20,
        y: mouseY * 10
      });
    });

    // Robot click interaction
    const robotElement = document.getElementById("robot");
    if (robotElement) {
      robotElement.addEventListener("click", () => {
        robotTl.pause();

        const helloTl = gsap
          .timeline({
            paused: true
          })
          .to("#faces", {
            x: isLeft ? 150 : -150,
            ease: "sine.inOut",
            repeatDelay: 1,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
              robotTl.resume();
            }
          });

        helloTl.restart();
      });
    }

    return () => {
      window.removeEventListener("mousemove", () => {});
      document.getElementById("robot")?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className="animated-robot-container">
      {/* Robot SVG */}
      <div className="svg-box" style={{ width: 800, height: 600, position: "absolute", zIndex: 10 }}>
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <defs />
          <defs>
            <clipPath id="clip-path">
              <rect id="graph-line-mask" width="105.2" height="66.7" x="439.5" y="186.6" fill="none" />
            </clipPath>
            <clipPath id="clip-path-2">
              <path id="body-mask" fill="none" d="M490.4 368.3c0 63.7-38 140-84.7 140s-84.8-76.3-84.8-140 38-90.6 84.8-90.6 84.7 26.9 84.7 90.6z" />
            </clipPath>
          </defs>
          <g id="Ship">
            <g id="mid-display">
              <rect width="320.3" height="207" x="248.8" y="116.3" fill="#282e39" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" opacity=".8" rx="18.4" />
              <g id="graph-btm">
                <path id="graph-left" fill="var(--green-bright)" d="M439.7 292.1s4.5-19.4 8.7-19c3.6.3 4.6 9.2 7.3 9 3.4-.2 4-14 7.3-14.3 3-.2 4.7 10 8.3 10 4 0 5.1-12.6 8.8-12.8 4.1-.2 7.2 27.1 7.2 27.1z" />
                <path id="graph-morph1" fill="none" d="M439.7 292.1s2.2-10.8 6.5-10.4c3.5.3 8.3-18.9 11-19 3.4-.3 5.6 9 9 8.7 3-.3 3.5-3.2 7-3.2 4 0 5.9 10.6 9.5 10.4 4.2-.2 4.7 13.5 4.7 13.5z" />
                <path id="graph-right" fill="#34496a" d="M502.6 292.1s4.5-19.4 8.8-19c3.5.3 4.6 9.2 7.3 9 3.4-.2 3.9-14 7.3-14.3 3-.2 4.7 10 8.3 10 4 0 5-12.6 8.7-12.8 4.2-.2 7.3 27.1 7.3 27.1z" />
                <path id="graph-morph2" fill="none" d="M502.6 292.1s4.5-9.8 8.8-9.4c3.5.3 4.6-6.8 7.3-7 3.4-.2 3.9 6.6 7.3 6.4 3-.3 4.7-17.9 8.3-17.9 4 0 5 16.5 8.7 16.3 4.2-.2 7.3 11.6 7.3 11.6z" />
              </g>
              <g id="planet">
                <circle id="planet-base" cx="332.2" cy="207.8" r="37.3" fill="#34496a" />
                <ellipse id="planet-circle" cx="331.5" cy="207.8" fill="none" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" rx="61.8" ry="12.7" />
                <path id="planet-top" fill="#34496a" d="M294.9 207.8a37.3 37.3 0 0174.6 0z" />
              </g>
              <g className="graph-circle-lb" id="graph-cir-left">
                <circle cx="290.4" cy="287.5" r="20.8" fill="#34496a" />
                <path fill="var(--green-bright)" d="M290.4 287.5l5.3-20.1a20.8 20.8 0 0115.5 20z" />
              </g>
              <g className="graph-circle-lb" id="graph-cir-mid">
                <circle cx="345.4" cy="287.5" r="20.8" fill="#34496a" />
                <path fill="var(--green-bright)" d="M345.4 287.5l5.2-20.1a20.8 20.8 0 0115.5 20z" />
              </g>
              <g id="graph-cir">
                <circle cx="396.4" cy="292.1" r="16.4" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="2" />
                <circle cx="396.4" cy="292.1" r="20.8" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="2" />
                <circle cx="396.4" cy="292.1" r="11.6" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="2" />
                <circle id="graph-cir-1" cx="408" cy="292.1" r="2.3" fill="var(--green-bright)" />
                <circle id="graph-cir-2" cx="396.4" cy="275.7" r="2.3" fill="var(--green-bright)" />
                <circle id="graph-cir-3" cx="417.2" cy="292.1" r="2.3" fill="var(--green-bright)" />
                <circle id="graph-cir-mid-2" cx="396.4" cy="292.1" r="2.3" fill="var(--green-bright)" data-name="graph-cir-mid" />
              </g>
              <g id="graph-big" clipPath="url(#clip-path)">
                <path id="graph-line" fill="none" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" d="M439.7 206.4c26.3 0 26.3 34.2 52.6 34.2s26.3-34.2 52.6-34.2 26.3 34.2 52.6 34.2 26.3-34.2 52.6-34.2" />
              </g>
              <circle cx="275.7" cy="139.7" r="11.8" fill="#34496a" />
              <circle id="left-top-circle" cx="275.7" cy="139.7" r="11.8" fill="var(--green-bright)" />
              <line x1="300.8" x2="387.1" y1="134.3" y2="134.9" fill="none" stroke="#34496a" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" />
              <line x1="300.8" x2="338.5" y1="143.7" y2="143.9" fill="none" stroke="#34496a" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" />
              <circle cx="448.1" cy="161.4" r="13.3" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="5" />
              <path className="circles-top" id="circle-l" fill="none" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" d="M448 148.2a13.3 13.3 0 11-13.2 13.3 13.3 13.3 0 0113.3-13.3" />
              <circle cx="491.2" cy="161.4" r="13.3" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="5" />
              <path className="circles-top" id="circle-m" fill="none" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" d="M491.2 148.2a13.3 13.3 0 11-13.3 13.3 13.3 13.3 0 0113.3-13.3" />
              <circle cx="534.4" cy="161.4" r="13.3" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="5" />
              <path className="circles-top" id="circle-r" fill="none" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" d="M534.4 148.2a13.3 13.3 0 11-13.3 13.3 13.3 13.3 0 0113.3-13.3" />
            </g>
            <g id="btm-display">
              <g id="right-display">
                <g id="right-display-display">
                  <path fill="#282e39" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" d="M654.7 461H508.6c-10.5 0-15.8-8.5-12-19l26.2-72a29.9 29.9 0 0125.8-18.9h146c10.5 0 15.8 8.5 12 19l-26.2 72a29.9 29.9 0 01-25.7 18.8z" opacity=".8" />
                  <g id="bars">
                    <polygon id="bar-3-btm" fill="#34496a" points="656.9 441.2 642.4 441.2 667.6 371.7 682.2 371.7 656.9 441.2" />
                    <polygon id="bar-3-top" fill="var(--green-bright)" points="656.9 441.2 642.4 441.2 653 412 667.5 412 656.9 441.2" />
                    <polygon id="bar-2-btm" fill="#34496a" points="633.7 441.2 619.2 441.2 644.5 371.7 659 371.7 633.7 441.2" />
                    <polygon id="bar-2-top" fill="var(--green-bright)" points="633.7 441.2 619.2 441.2 636 395.1 650.5 395.1 633.7 441.2" />
                    <polygon id="bar-1-btm" fill="#34496a" points="610.6 441.2 596.1 441.2 621.4 371.7 635.9 371.7 610.6 441.2" />
                    <polygon id="bar-1-top" fill="var(--green-bright)" points="610.6 441.2 596.1 441.2 604 419.5 618.5 419.5 610.6 441.2" />
                  </g>
                  <g id="btns" fill="var(--green-bright)">
                    <ellipse cx="546.8" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 546.8 379.3)" />
                    <ellipse cx="562.7" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 562.7 379.3)" />
                    <ellipse cx="578.6" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 578.6 379.3)" />
                    <ellipse cx="594.5" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 594.5 379.3)" />
                    <ellipse cx="540.6" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 540.6 396.3)" />
                    <ellipse cx="556.5" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 556.5 396.3)" />
                    <ellipse cx="572.4" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 572.4 396.3)" />
                    <ellipse cx="588.3" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 588.4 396.3)" />
                    <ellipse cx="534.4" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 534.4 413.3)" />
                    <ellipse cx="550.3" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 550.3 413.3)" />
                    <ellipse cx="566.2" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 566.2 413.3)" />
                    <ellipse cx="582.1" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 582.2 413.3)" />
                    <ellipse cx="528.2" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 528.2 430.3)" />
                    <ellipse cx="544.1" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 544.1 430.3)" />
                    <ellipse cx="560" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.6 562.3 429.7)" />
                    <ellipse cx="575.9" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 576 430.3)" />
                  </g>
                </g>
                <ellipse id="right-display-shadow" cx="593.3" cy="508.4" fill="#1e3855" rx="74" ry="10.9" />
              </g>
              <g id="left-display">
                <g id="left-display-display">
                  <path fill="#282e39" stroke="var(--green-bright)" strokeMiterlimit="10" strokeWidth="5" d="M299 461H153c-10.4 0-22-8.5-25.8-19L101 370c-3.8-10.4 1.6-18.9 12-18.9h146c10.5 0 22 8.5 25.9 18.9l26.2 72c3.8 10.4-1.6 19-12 19z" opacity=".8" />
                  <polygon fill="var(--green-bright)" points="153.1 433.3 155.7 440.3 158.2 447.3 153.6 443.8 148.9 440.3 151 436.8 153.1 433.3" />
                  <polygon fill="var(--green-bright)" points="143 433.3 146.4 433.3 151.9 448.4 148.5 448.4 143 433.3" />
                  <polygon fill="var(--green-bright)" points="193.8 448.4 191.3 441.4 188.7 434.4 193.4 437.9 198 441.4 195.9 444.9 193.8 448.4" />
                  <polygon fill="var(--green-bright)" points="203.9 448.4 200.6 448.4 195.1 433.3 198.4 433.3 203.9 448.4" />
                  <polygon fill="var(--green-bright)" points="164.4 433.3 167.8 433.3 173.3 448.4 169.9 448.4 164.4 433.3" />
                  <polygon fill="var(--green-bright)" points="174 433.3 177.4 433.3 182.9 448.4 179.5 448.4 174 433.3" />
                  <ellipse cx="199" cy="377.7" fill="#34496a" rx="5.4" ry="7.7" transform="rotate(-50.2 199 377.7)" />
                  <polygon fill="var(--green-bright)" points="198.2 380.9 197 377.7 195.9 374.6 199.2 376.1 202.6 377.7 200.4 379.3 198.2 380.9" />
                  <line x1="217.3" x2="267.5" y1="377.7" y2="377.7" fill="#282e39" stroke="var(--green-bright)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" opacity=".8" />
                  <ellipse cx="206.2" cy="397.6" fill="#34496a" rx="5.4" ry="7.7" transform="rotate(-50.2 206.2 397.6)" />
                  <polygon fill="var(--green-bright)" points="205.4 400.7 204.2 397.6 203.1 394.4 206.4 396 209.8 397.6 207.6 399.2 205.4 400.7" />
                  <line x1="224.5" x2="274.8" y1="397.6" y2="397.6" fill="#282e39" stroke="var(--green-bright)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" opacity=".8" />
                  <ellipse cx="213.5" cy="417.5" fill="#34496a" rx="5.4" ry="7.7" transform="rotate(-50.2 213.4 417.4)" />
                  <polygon fill="var(--green-bright)" points="212.6 420.6 211.5 417.5 210.3 414.3 213.7 415.9 217 417.5 214.8 419 212.6 420.6" />
                  <line x1="231.8" x2="282" y1="417.5" y2="417.5" fill="#282e39" stroke="var(--green-bright)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" opacity=".8" />
                  <ellipse cx="220.7" cy="437.3" fill="#34496a" rx="5.4" ry="7.7" transform="rotate(-50.2 220.7 437.3)" />
                  <polygon fill="var(--green-bright)" points="219.8 440.5 218.7 437.3 217.6 434.2 220.9 435.8 224.3 437.3 222.1 438.9 219.8 440.5" />
                  <line x1="239" x2="289.2" y1="437.3" y2="437.3" fill="#282e39" stroke="var(--green-bright)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" opacity=".8" />
                  <path fill="#34496a" d="M190.5 424.4h-46a7.4 7.4 0 01-6.5-4.7l-15.8-43.5c-1-2.6.4-4.7 3-4.7h46a7.4 7.4 0 016.5 4.7l15.8 43.5c1 2.6-.4 4.7-3 4.7z" />
                  <ellipse cx="157.8" cy="398" fill="#282e39" rx="17.5" ry="25.1" transform="rotate(-50.2 157.8 398)" />
                  <ellipse cx="157.8" cy="398" fill="#282e39" rx="5.1" ry="7.3" transform="rotate(-50.2 157.8 398)" />
                  <path fill="var(--green-bright)" d="M159.8 405a10 10 0 01-8.8-6.4 5.8 5.8 0 01.5-5.4 5.3 5.3 0 014.4-2.2 10 10 0 018.8 6.4 5.8 5.8 0 01-.5 5.4 5.3 5.3 0 01-4.4 2.1zm-3.9-10.6a2 2 0 00-1.6.7 2.5 2.5 0 000 2.3 6.6 6.6 0 005.4 4 2 2 0 001.7-.6 2.5 2.5 0 000-2.3 6.6 6.6 0 00-5.5-4zM173.6 405h14.5l-5.1-14h-14.4a1.8 1.8 0 00-1.7 2.6l3.2 8.7a4.1 4.1 0 003.5 2.6z" />
                </g>
                <ellipse id="left-display-shadow" cx="224.5" cy="511.5" fill="#1e3855" rx="74" ry="10.9" />
              </g>
            </g>
            {/* Robot group */}
            <g id="robot">
              <path id="body-base" fill="var(--lightest-slate)" d="M490.4 368.3c0 63.7-38 140-84.7 140s-84.8-76.3-84.8-140 38-90.6 84.8-90.6 84.7 26.9 84.7 90.6z" />
              <g id="robot-body">
                <ellipse id="robot-shadow" cx="405.6" cy="543.9" fill="#1e3855" rx="44.5" ry="7.1" />
                <g clipPath="url(#clip-path-2)">
                  <g id="faces">
                    <g id="face">
                      <ellipse id="face-back" cx="560" cy="340.9" fill="#34496a" rx="61.5" ry="32.2" />
                      <g className="eyes" id="eyes" fill="var(--green-bright)">
                        <ellipse cx="539.8" cy="340.9" rx="7.3" ry="13.7" />
                        <ellipse cx="579.1" cy="340.9" rx="7.3" ry="13.7" />
                      </g>
                    </g>
                    <g id="face-2" data-name="face">
                      <ellipse id="face-back-2" cx="256.9" cy="340.9" fill="#34496a" data-name="face-back" rx="61.5" ry="32.2" />
                      <g className="eyes" id="eyes-2" fill="var(--green-bright)" data-name="eyes">
                        <ellipse cx="236.7" cy="340.9" rx="7.3" ry="13.7" />
                        <ellipse cx="275.9" cy="340.9" rx="7.3" ry="13.7" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <path id="right-hand" fill="var(--lightest-slate)" d="M549.7 400.7c0 15.6-31.2 28.2-56.2 28.2s-34.2-12.6-34.2-28.2 9.2-28 34.2-28 56.2 12.5 56.2 28z" />
              <path id="left-hand" fill="var(--lightest-slate)" d="M255.6 400.7c0-15.5 31.2-28 56.2-28s34.2 12.5 34.2 28-9.3 28.2-34.2 28.2-56.2-12.6-56.2-28.2z" />
            </g>
            <path id="note-1" fill="none" d="M180 317l-3.5-3.8a1 1 0 00-1.7.7v8.1a6 6 0 00-2-.3c-2.5 0-4.6 1.6-4.6 3.5s2 3.5 4.7 3.5 4.6-1.5 4.6-3.5a3 3 0 00-.7-1.9v-6.8l1.7 1.8a1 1 0 101.5-1.4z" />
            <path id="note-2" fill="none" d="M203.4 323.4v-9.5a1 1 0 00-1-1h-9.3a1 1 0 00-1 1v8.1a6 6 0 00-2-.3c-2.5 0-4.6 1.6-4.6 3.5s2 3.5 4.7 3.5 4.6-1.5 4.6-3.5a2.9 2.9 0 00-.7-1.9V315h7.3v7.1a5.8 5.8 0 00-1.9-.3c-2.6 0-4.7 1.6-4.7 3.5s2.1 3.5 4.7 3.5 4.7-1.5 4.7-3.5a2.9 2.9 0 00-.8-1.8z" />
          </g>
        </svg>
      </div>
    </div>
  );
}