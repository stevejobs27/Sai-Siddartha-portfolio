import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from './icons/icon';
import "../styles/NavBar.css";
import logo from "../assets/logo.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      lastScrollY: window.scrollY,
      atTop: window.scrollY === 0
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

    // Track if at top
    const atTop = currentScrollY === 0;

    if (currentScrollY > lastScrollY && currentScrollY > 60) {
      // Scrolling down
      this.setState({ show: false, lastScrollY: currentScrollY, atTop });
    } else {
      // Scrolling up or at top
      this.setState({ show: true, lastScrollY: currentScrollY, atTop });
    }
  }

  render() {
    const { showStars, setShowStars } = this.props;
    const { show, atTop } = this.state;
    return (
      <Navbar
        fixed="top"
        className={`bg-body-tertiary navbar-animated${show ? " navbar-visible" : " navbar-hidden"}${atTop ? " navbar-at-top" : ""}`}
        style={{
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s, box-shadow 0.3s",
          zIndex: 1000
        }}
      >
        <Container>
          <Navbar.Brand href="Home">
            <img
              src={logo}
              alt="Rafsan Ahmed Logo"
              title="Logo"
              className="logo"
              style={{ height: "28px", width: "auto" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#intro">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#experience">Experience</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
            </Nav>
            <Nav className="ml-auto" style={{ alignItems: "center" }}>
              <Nav.Link href="https://github.com/rafsanahmed28" title="GitHub" target="_blank">
                <Icon name="GitHub" />
              </Nav.Link>
              <Nav.Link href="https://www.linkedin.com/in/rafsanahmed28/" title="LinkedIn" target="_blank">
                <Icon name="Linkedin" />
              </Nav.Link>
              <Nav.Link href="https://medium.com/@rafsanahmed2828" title="Medium" target="_blank">
                <Icon name="Medium" />
              </Nav.Link>
              <Nav.Link
                onClick={() => setShowStars((prev) => !prev)}
                className={showStars ? "star-active" : ""}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50%",
                  background: "none",
                  border: "none",
                }}
                title={showStars ? "Disable Background" : "Enable Background"}
              >
                <Icon name="Star"/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;