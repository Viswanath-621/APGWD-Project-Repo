import React from "react";
import AlertLineIcon from "remixicon-react/AlertLineIcon";
import AlertFillIcon from "remixicon-react/AlertFillIcon";

function Heroland() {
  return (
    <div className="hero-main">
      <section className="viswa-hero-section">
        <div className="hero-text">
          <h5>#1 Project</h5>
          <h4>VRSEC</h4>
          <h1>Water Audit Department</h1>
          <p>
            Make advance tracking a breeze with our easy-to-use Tracking app.
            JOIN Millions of users worldwide and streamline in monitoring your
            projects with our user-friendly tracking application - the perfect
            tool for simplifying everyday analysis!
          </p>

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

export default Heroland;
