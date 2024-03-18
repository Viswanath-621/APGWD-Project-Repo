import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminNavBar({username}) {

    // console.log("us", isLoggedIn, username, handleLogout)
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
                    {/* <p></p> */}
                </div>
                
                <div className="Logos-f">
                    <img src="4-logo.png" alt="APGWD-LOGO4" />
                </div>
                
                
                <div className="logind">
                    <div>
                        <h4>Hi, {username}!</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavBar;
