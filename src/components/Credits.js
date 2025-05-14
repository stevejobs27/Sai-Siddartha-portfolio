import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";

class Credits extends React.Component {
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
    return (
      <FadeInSection>
        <div id="credits">
          <div className="ending-credits">
            <a href="https://github.com/rafsanahmed28/rafsan"
               target="_blank"
               rel="noopener noreferrer">
                Designed & Built by Rafsan Ahmed
              </a>
          </div>
        </div>
      </FadeInSection>
    );
  }
}

export default Credits;
