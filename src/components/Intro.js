import React from "react";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";
import CircleAnimations from "./CircleAnimations";

const spiralIds = ["anim1", "anim3", "anim5", "anim6", "anim8", "anim9", "anim10", "anim11", "anim12"];

class Intro extends React.Component {
  constructor() {
    super();
    const defaultId = "anim8";
    const randomId = spiralIds[Math.floor(Math.random() * spiralIds.length)];

    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
      randomSpiralId: window.performance.navigation.type === 1 ? randomId : defaultId,
      showPopup: false, // <-- add popup state
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleCircleClick = this.handleCircleClick.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
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

  handlePopup() {
    this.setState({ showPopup: true });
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  render() {
    return (
      <div id="intro">
        <CircleAnimations
          showid={this.state.randomSpiralId}
          onCircleClick={this.handleCircleClick}
        />
        <Typist
          avgTypingDelay={120}
          cursor={{ show: true, blink: true, hideWhenDone: true, hideWhenDoneDelay: 0 }}
        >
          <span className="intro-title">
            {"hey, there! i'm  "}
          </span>
            <span className="intro-name">{"rafsan."}</span>
        </Typist>
        <div className="intro-subtitle">
          I'm a <span className="intro-subtitle-name">{"Data Analyst"}</span> with a love for design.
        </div>
        <FadeInSection>
          <div className="intro-desc">
            I'm an aspiring Data Analyst based in Toronto, Canada. Passionate about using data to
            drive business decisions and innovation. Eager to leverage my skills in leading
            industries to create meaningful impact.
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;