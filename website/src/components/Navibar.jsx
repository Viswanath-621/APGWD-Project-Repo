import React from "react";
import Login from "./Auth/Login";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navibar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    // Implement your logout logic, e.g., clear local storage, update state, etc.
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="navi">
      <div className="container-fluid">
        <div className="Logos">
          <img src="1-logo.png" alt="" />
          <img src="2-logo.png" alt="" />
          <img src="3-logo.png" alt="" />
        </div>

        <div className="page-title">
          <p className="lead">Government of Andhra Pradesh</p>

          <h2>Ground Water & Water Audit Department</h2>

          <p className="lead">Water Resource Department</p>
        </div>

        <div className="Logos-f">
          <img src="4-logo.png" alt="" />
        </div>

        <div className="logind">
          <div>
            {isLoggedIn ? (
              <>
                <h1>Hi, {username}!</h1>
                <h1 onClick={handleLogout}>Logout</h1>
              </>
            ) : (
              <Link to="/login">Login Now</Link>
            )}
          </div>
        </div>
      </div>

      <div className="links-da">
        <ul>
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="https://apsgwd.ap.gov.in/readmore/real-monitoring">NEWS</a>
          </li>
          <li>
            <a href="https://apsgwd.ap.gov.in/home?id=award">AWARDS</a>
          </li>
          <li>
            <a href="https://apwrims.ap.gov.in/">APWRIMS</a>
          </li>
          <li>
            <a href="https://apsgwd.ap.gov.in/home?id=contact">CONTACT</a>
          </li>
          <li>
            <a href="#about">ABOUT US</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navibar;
