// ...existing imports...
import React from "react";
import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";
import CircleAnimations from "./CircleAnimations";

const spiralIds = ["anim1", "anim3", "anim4", "anim5", "anim6", "anim8", "anim9", "anim10", "anim11", "anim12"];

class Intro extends React.Component {
  constructor() {
    super();
    const defaultId = "anim10";
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
    const { showStars } = this.props;
    const { showPopup } = this.state;

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
            {"hey, "}
            <span className="intro-name">{"world! "}</span>
          </span>
            <span className="intro-title">
            {"i'm "}
            <span className="intro-name">{"rafsan."}</span>
          </span>
        </Typist>
        <div className="intro-subtitle">
          I turn curiosity into insights and data into stories.
        </div>
        <FadeInSection>
          <div className="intro-desc">
            I'm an aspiring Data Analyst based in Toronto, Canada. Passionate about using data to
            drive business decisions and innovation. Eager to leverage my skills in leading
            industries to create meaningful impact.
          </div>
          <span className="intro-click-here">
          Click the Power Icon for something interesting!
          </span>
        </FadeInSection>
        {showStars && (
          <Typist
            avgTypingDelay={50}
            className="stars-typist"
            cursor={{ show: true, blink: true, hideWhenDone: true, hideWhenDoneDelay: 0 }}
          >
            <span>
              Why the space theme
              <span
                className="intro-question-mark"
                onClick={this.handlePopup}
                title="Click to learn more"
              > ?</span>
            </span>
          </Typist>
        )}
        {showPopup && (
          <div
            className="intro-popup-overlay"
            onClick={this.closePopup}
          >
          <div
            className="intro-popup"
            onClick={e => e.stopPropagation()}
          >
          <span className="popup-text">
            Each star represents a unique data point in the vast ocean of data.
          </span>
          </div>
          </div>
        )}
      </div>
    );
  }
}

export default Intro;