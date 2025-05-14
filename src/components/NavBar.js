import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import StarIcon from "@material-ui/icons/Star";
import "../styles/NavBar.css";

class NavBar extends React.Component {
  render() {
    const { showStars, setShowStars } = this.props;
    return (
      <Navbar fixed="top" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">RA</Navbar.Brand>
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
                <StarIcon
                  style={{
                    color: showStars ? "#7187e9" : "#ffffff",
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