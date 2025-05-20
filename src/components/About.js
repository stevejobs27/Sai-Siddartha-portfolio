import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

// <div className="about-image"><img alt="Rafsan Ahmed" src={"/assets/me.jpg"}/></div> //

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const one = (
      <p>
        I am an aspiring Data Analyst exploring the field through hands-on
        <a href="https://github.com/rafsanahmed28"> projects </a>. 
        Recently, I completed my graduation in Master of Engineering in Innovation & Entrepreneurship at{" "}
        <a href="https://www.torontomu.ca/">Toronto Metropolitan University</a> where working with startups on market 
         research and product development completely made me fall in love with the power of data. Since then, 
        I have been honing my skills with analytical tools and technologies to build my expertise.
      </p>
    );
    const two = (
      <p>
        Outside of work, I'm interested in cool tech products, 
        aesthetic decor. I also play video games.
      </p>
    );

    const tech_stack = [
      "MySQL",
      "PostgreSQL",
      "Python",
      "Tableau",
      "R",
      "Excel"
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">About Me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
