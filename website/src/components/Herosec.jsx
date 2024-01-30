import React from "react";
import { useState } from "react";
import AlertLineIcon from "remixicon-react/AlertLineIcon";
import AlertFillIcon from "remixicon-react/AlertFillIcon";

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
          </li></div>
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
          <h1>Water Audit Department</h1>
          <p>
            Make advance tracking a breeze with our easy-to-use Tracking app.
            JOIN Millions of users worldwide and streamline in monitoring your
            projects with our user- <br/>friendly tracking application - the perfect
            tool for <br/>simplifying everyday analysis!
          </p>
          
          <para></para>
          
          <a href="#main-da" className="ctaa">
            Explore Now
          </a>

          
          <a href="#" className="ctaa">
            <i className="ri-play-fill"></i> Watch Premiere
          </a>
          
        </div>

        <div className="hero-landing-img">
          <img src="hero-sec-img.png" alt="viswa-landing-photo" />
        </div>
      </section>
    </div>
  );
}

export default Herosec;
