import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { ReactComponent as AutoFixHighSVG } from "../assets/auto_fix_high.svg";
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
              className="logo-animated"
              style={{ height: "36px", width: "auto" }}
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
              <Nav.Link href="mailto:rafsanahmed2828@gmail.com">
                <EmailRoundedIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="https://github.com/rafsanahmed28" target="_blank">
                <GitHubIcon style={{ fontSize: 19 }} />
              </Nav.Link>
              <Nav.Link href="https://www.linkedin.com/in/rafsanahmed28/" target="_blank">
                <LinkedInIcon style={{ fontSize: 21 }} />
              </Nav.Link>
              <Nav.Link href="https://medium.com/@rafsanahmed2828" target="_blank">
                <BorderColorIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link
                onClick={() => setShowStars((prev) => !prev)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50%",
                  background: "none",
                  border: "none",
                }}
                title={showStars ? "Disable Stars" : "Enable Stars"}
              >
                <AutoFixHighSVG
                  style={{
                    color: showStars ? "#26E2A9" : "#ffffff",
                    fontSize: 24,
                    transition: "color 0.3s"
                  }}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;