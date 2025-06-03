import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/NavBar.css";
import Icon from "./Icons";
import { gsap } from "gsap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      lastScrollY: window.scrollY,
      atTop: window.scrollY === 0,
      showStars: props.showStars || false,
      mobileMenuOpen: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleStars = this.toggleStars.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.mobileMenuRef = React.createRef();
    this.hamburgerRef = React.createRef();
    this.navbarRef = React.createRef();
  }

  toggleStars() {
    if (typeof this.props.setShowStars === 'function') {
      this.props.setShowStars(prev => !prev);
    } else {
      this.setState(prevState => ({
        showStars: !prevState.showStars
      }));
    }
  }

  toggleMobileMenu() {
    const { mobileMenuOpen } = this.state;
    
    this.setState({ mobileMenuOpen: !mobileMenuOpen });
    
    if (!mobileMenuOpen) {
      gsap.to(this.mobileMenuRef.current, {
        x: 0, 
        duration: 0.4,
        ease: "power3.out"
      });
      
      gsap.to(this.hamburgerRef.current.querySelector('.line-1'), {
        rotation: 45,
        y: 8,
        duration: 0.3
      });
      gsap.to(this.hamburgerRef.current.querySelector('.line-2'), {
        opacity: 0,
        duration: 0.3
      });
      gsap.to(this.hamburgerRef.current.querySelector('.line-3'), {
        rotation: -45,
        y: -8,
        duration: 0.3
      });
    } else {
      gsap.to(this.mobileMenuRef.current, {
        x: '100%', 
        duration: 0.4,
        ease: "power3.in"
      });
      
      gsap.to(this.hamburgerRef.current.querySelector('.line-1'), {
        rotation: 0,
        y: 0,
        duration: 0.3
      });
      gsap.to(this.hamburgerRef.current.querySelector('.line-2'), {
        opacity: 1,
        duration: 0.3
      });
      gsap.to(this.hamburgerRef.current.querySelector('.line-3'), {
        rotation: 0,
        y: 0,
        duration: 0.3
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    
    gsap.set(this.mobileMenuRef.current, {
      x: '100%' 
    });
    
    gsap.set(this.navbarRef.current, {
      opacity: 0,
      y: -15
    });
    
    gsap.to(this.navbarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2
    });
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
    const { show, atTop, mobileMenuOpen } = this.state;
    const showStars = this.props.showStars !== undefined ? this.props.showStars : this.state.showStars;

    return (
      <Navbar
        ref={this.navbarRef} 
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
            <div className="logo-container btn-effect">
              <img className="logo"
                src="/assets/logo.png"
                alt="Rafsan Ahmed Logo"
                title="Logo"
                style={{ height: "36px", width: "36px" }}
              />
            </div>
          </Navbar.Brand>
          
          {/* Desktop Nav Links */}
          <div className="desktop-nav">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#projects">Projects</Nav.Link>
                <Nav.Link href="#timeline">Timeline</Nav.Link>
                <Nav.Link href="#experience">Experience</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          
          {/* Mobile Controls Group */}
          <div className="mobile-controls">
            {/* Star Toggle Button */}
            <button
              className={`star-btn navbar-star-btn${showStars ? " star-active" : ""}`}
              onClick={this.toggleStars}
              title={showStars ? "Disable Background" : "Enable Background"}
              type="button"
            >
              <Icon name="Star" />
            </button>
            
            {/* Divider */}
            <div className="navbar-mobile-divider"></div>
            
            {/* Hamburger Button */}
            <button 
              className="hamburger-menu" 
              ref={this.hamburgerRef}
              onClick={this.toggleMobileMenu}
            >
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </button>
          </div>
          
          {/* Mobile Dropdown Menu */}
          <div 
            className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}
            ref={this.mobileMenuRef}
          >
            <Nav className="mobile-nav-links">
              <Nav.Link href="#about" onClick={this.toggleMobileMenu}>About</Nav.Link>
              <Nav.Link href="#projects" onClick={this.toggleMobileMenu}>Projects</Nav.Link>
              <Nav.Link href="#timeline" onClick={this.toggleMobileMenu}>Timeline</Nav.Link>
              <Nav.Link href="#experience" onClick={this.toggleMobileMenu}>Experience</Nav.Link>
              <Nav.Link href="#contact" onClick={this.toggleMobileMenu}>Contact</Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;