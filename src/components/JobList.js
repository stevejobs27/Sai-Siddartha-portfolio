import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../styles/Experience.css";

const experienceItems = {
  "Teachnook": {
    jobTitle: "Intern @",
    duration: "MAR 2023 - APR 2023",
    desc: [
      "Performed Exploratory Data Analysis (EDA) on datasets, applying suitable classifiers or regressors (Logistic Regression on insurance data, Linear Regression on a challenge dataset).",
      "Achieved 92.86% accuracy for both Logistic Regression and K-Nearest Neighbors Classifier models.",
      "During the two-month program , I  worked on understanding Python basics and machine learning concepts, implementing practical models using Jupyter Notebook.", 
      " Key activities included manipulating Pandas DataFrames, data visualization with Matplotlib, handling missing values, encoding categorical data, scaling data, and working with mileage datasets. I was  trained in supervised machine learning essentials  specifically Logistic Regression, Linear Regression, and K-Nearest Neighbors (KNN)."
      
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