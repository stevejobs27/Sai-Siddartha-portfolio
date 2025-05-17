import React from "react";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";
import CircleAnimations from "./CircleAnimations";

const spiralIds = [ "anim4", "anim5", "anim6", "anim8", "anim9", "anim10", "anim11", "anim12" ];

class Intro extends React.Component {
  constructor() {
    super();
    const randomId = spiralIds[Math.floor(Math.random() * spiralIds.length)];
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
      randomSpiralId: randomId
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCircleClick = this.handleCircleClick.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }

  handleCircleClick() {
    let newId;
    do {
      newId = spiralIds[Math.floor(Math.random() * spiralIds.length)];
    } while (newId === this.state.randomSpiralId);
    this.setState({ randomSpiralId: newId });
  }

  render() {
    return (
      <div id="intro">
        <CircleAnimations
          showid={this.state.randomSpiralId}
          onCircleClick={this.handleCircleClick}
        />
        <Typist avgTypingDelay={120}>
          <span className="intro-title">
            {"hi, "}
            <span className="intro-name">{"rafsan"}</span>
            {" here."}
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle">I like to clean and build stuff with data</div>
          <div className="intro-desc">I'm an aspiring Data Analyst based in Toronto, Canada. 
            Passionate about using data to drive business decisions and innovation. 
            Eager to leverage my skills in leading industries to create meaningful impact.
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;