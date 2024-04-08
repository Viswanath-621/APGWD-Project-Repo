import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navibar from "../Navibar";

import Admin from "../../pages/Admin";
import Welcome from "../../pages/Welcome";
import Footer from "../Footer";



function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const [successState, setSuccessState] = useState(false);
  const [designation, setDesignation] = useState("");
  const [gdistrict, setGdistrict] = useState("");
  const [us, setus] = useState("");
  const [userComponent, setUserComponent] = useState(null);


  const LoginRoute = import.meta.env.VITE_LOGIN_ROUTE
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post("https://apgwdback.onrender.com/login", { username, password });
      // const response = await axios.post('https://apgwd-backend-service.onrender.com/login', { username, password });
      // const response = await axios.post('http://localhost:8000/login', { username, password });
      const response = await axios.post(LoginRoute, { username, password });
      console.log(LoginRoute);
      console.log("Response from server:", response);
      const { success, message, designation, district, username: responseUsername } = response.data;

      console.log(responseUsername); // Use the renamed variable here
      console.log(district, message, designation);
      console.log("success", success);
      setSuccessState(success);

      if (success) {
        console.log('Login Successfully');

        setGdistrict(district);
        setDesignation(designation);
        setus(responseUsername); // Use the renamed variable here
        setIsLoggedIn(true);

        console.log(gdistrict, 'D', designation);

      } else {
        console.log(message);
      }

    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  useEffect(() => {
    // Log the values after the component re-renders
    console.log(gdistrict, 'D', designation);
  }, [gdistrict, designation]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  const divStyle = {
    backgroundImage: 'url("signbg.png")'
  };

  const divlStyle = {
    backgroundImage: "url('/login-bg.png')"
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div> 
      {/* <Navibar isLoggedIn={isLoggedIn} username={username} /> */}
      {/* <Navibar isLoggedIn={isLoggedIn} username={us} handleLogout={handleLogout} /> */}

      <Navibar isLoggedIn={isLoggedIn} username={us} handleLogout={handleLogout} />
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

      {designation === "admin" && (

        <Navigate to="/admin" replace={true} state={{ district: gdistrict, name: us }} />

      )}
      {designation === "employee" && (
        <Navigate
          to="/employee"
          replace={true}
          state={{ district: gdistrict, name: us }}
        />
      )}

      {
        designation === 'jd' && (<Navigate to="/jd" replace={true} />)

      }
      <div className="login-container" style={divStyle}>
        <div className="login-content" style={divlStyle}>
          <h2>Login Now</h2> <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">
                <strong>Email</strong>
              </label>{" "}
              <br />
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="username"
                className="input-p"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>{" "}
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                // value={password}
                className="input-p"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" >
              Login
            </button><br/><br />
          </form>
          <div className="signup-btn">
            <p>
              Don't have an account?
              <Link to="/Signup">Sign Up Now</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

const AdminComponent = () => {
  return (<Admin />)
  {/* Add Admin-specific content here */ }

};

const UserComponent = () => {
  return (<Welcome />)
};


export default Login;