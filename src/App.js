import React, { useState } from "react";
import Intro from "./components/Intro";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
import Featured from "./components/Featured";
import Contact from "./components/Contact";
import { StarsCanvas } from "./components/StarBackground";
import "./App.css";
import "./styles/Global.css";
import 'rsuite/styles/index.less';

function App() {
  const [showStars, setShowStars] = useState(false);

  return (
    <div className="App">
      {showStars && <StarsCanvas />}
      <NavBar showStars={showStars} setShowStars={setShowStars} />
      <SideNavBar showStars={showStars} setShowStars={setShowStars} />
      <div id="content">
        <Intro showStars={showStars} setShowStars={setShowStars}/>
        <About />
        <Timeline />
        <Experience />
        <Featured />
        <Projects />
        <Contact />
        <Credits />
      </div>
    </div>
  );
}

export default App;