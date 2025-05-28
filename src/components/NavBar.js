import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/NavBar.css";
import Icon from "./icons/icon";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      lastScrollY: window.scrollY,
      atTop: window.scrollY === 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;
    const atTop = currentScrollY === 0;

    if (currentScrollY > lastScrollY && currentScrollY > 60) {
      this.setState({ show: false, lastScrollY: currentScrollY, atTop });
    } else {
      this.setState({ show: true, lastScrollY: currentScrollY, atTop });
    }
  }

  render() {
    const { show, atTop } = this.state;
    const { showStars, setShowStars } = this.props; // Receive from parent

    return (
      <Navbar
        fixed="top"
        className={`bg-body-tertiary navbar-animated${show ? " navbar-visible" : " navbar-hidden"}${atTop ? " navbar-at-top" : ""}`}
        style={{
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s, box-shadow 0.3s",
          zIndex: 1000,
        }}
      >
        <Container
          fluid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Navbar.Brand href="Home">
            <img
              src="/assets/logo.png"
              alt="Rafsan Ahmed Logo"
              title="Logo"
              className="logo"
              style={{ height: "28px", width: "auto" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#timeline">Timeline</Nav.Link>
              <Nav.Link href="#experience">Experience</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <span className="navbar-star-divider"></span>
          <button
            className={`star-btn navbar-star-btn${showStars ? " star-active" : ""}`}
            onClick={() => setShowStars((prev) => !prev)}
            title={showStars ? "Disable Background" : "Enable Background"}
            type="button"
          >
            <Icon name="Power" />
          </button>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;