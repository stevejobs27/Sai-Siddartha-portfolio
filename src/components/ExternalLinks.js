import React from "react";
import Icon from "./icons/icon";

class ExternalLinks extends React.Component {
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
      <span className="external-links">
        <a className="github-icon" href={this.props.githubLink}>
          <Icon name="GitHub" />
        </a>
        {this.props.openLink && (
          <a className="open-icon" href={this.props.openLink}>
            <Icon name="External" />
          </a>
        )}
      </span>
    );
  }
}

export default ExternalLinks;
