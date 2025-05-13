import React, { useEffect, useRef, useState } from "react";

export default function FadeInSection({ children, delay = "0ms" }) {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    });

    if (node instanceof Element) observer.observe(node);
    return () => {
      if (node instanceof Element) observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
