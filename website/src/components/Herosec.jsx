import React from "react";
import { useState } from "react";
import AlertLineIcon from "remixicon-react/AlertLineIcon";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import NetworkMap from "./NetworkMap";

function Herosec() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="hero-main">
      <div className="burger" onClick={toggleMenu}>
        <span>☰</span>
      </div>

      <div className={`links-da ${isMenuOpen ? 'show' : ''}`}>
      <ul>
        <div className="nav-col1">
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="https://apsgwd.ap.gov.in/readmore/real-monitoring">NEWS</a>
          </li>
          <li>
            <a href="https://apsgwd.ap.gov.in/home?id=award">AWARDS</a>
          </li>
          </div>
          <div className="nav-col2">
          <li>
            <a href="https://apwrims.ap.gov.in/">APWRIMS</a>
          </li>
          <li>
            <a href="https://apsgwd.ap.gov.in/home?id=contact">CONTACT</a>
          </li>
          <li>
            <a href="#about">ABOUT US</a>
          </li></div>
        </ul>
      </div>
     
      <section className="viswa-hero-section">
        <div className="hero-text">
          <h5>#1 Project</h5>
          <h4>VRSEC</h4>
          <h1>Ground Water Level Monitoring System</h1>
          <p>
          Andhra Pradesh government's groundwater level monitoring system: 
          a thorough system for tracking and controlling groundwater levels 
          in the area, guaranteeing sustainable management of water resources
           and well-informed choices.
          </p>
          
          <a href="#main-da" className="ctaa">
            Explore Now
          </a>

          
          <a href="#" className="ctaa">
            <i className="ri-play-fill"></i> Watch Premiere
          </a>  
        </div>
        
        <div className="hero-landing-img">
        <img src="apdistmap.jpg" height="600px" alt="viswa-landing-photo" />
        
        </div>
      </section>
    </div>
  );
}

export default Herosec;
