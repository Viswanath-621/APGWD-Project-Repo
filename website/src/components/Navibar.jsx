import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navibar({ isLoggedIn = false, username = "", handleLogout = () => {} }) {
  
  console.log("us", isLoggedIn, username,handleLogout)
  return (
    <div className="navi">
      <div className="container-fluid">
        <div className="Logos">
          <img src="1-logo.png" alt="img-1" />
          <img src="2-logo.png" alt="img-2" />
          <img src="3-logo.png" alt="img-3" />
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
                <h4>Hi, {username}!</h4>
                <button onClick={handleLogout}>{username}</button>
              </>
            ) : (
              <Link to="/login">Login Now</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navibar;
