import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navibar from "../Navibar";

import Admin from "../../pages/Admin";
import Welcome from "../../pages/Welcome";
import AdminNavBar from "../../pages/AdminNavBar";



function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const [successState, setSuccessState] = useState(false);
  const [designation, setDesignation] = useState("");
  const [gdistrict, setGdistrict] = useState("");
  const [us, setus] = useState("");
  const [userComponent, setUserComponent] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", { username, password });
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

  return (
    <div>
      {/* <Navibar isLoggedIn={isLoggedIn} username={username} /> */}
      {/* <Navibar isLoggedIn={isLoggedIn} username={us} handleLogout={handleLogout} /> */}

      <Navibar isLoggedIn={isLoggedIn} username={us} handleLogout={handleLogout} />


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
      <div className="login-container">
        <div className="login-content">
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
                // value={username}
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

            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>
          <div className="signup-btn">
            <p>
              Don't have an account?
              <Link to="/Signup">Sign Up Now</Link>
            </p>
          </div>
        </div>
      </div>

      {userComponent}
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

// import React from "react";
// import { useState } from "react";

// function Loginda({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onLogin({ username, password });

//   };

//   return (
//     <div>
//       <h2>Login Now</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="container">
//           <label>
//             <b>Username</b>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <label>
//             <b>Password</b>
//           </label>

//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" value="Submit" className="Login-b">
//             Login
//           </button>

// <label>
//   <input type="checkbox" name="remember" /> Remember me
// </label>

// <div className="container-f">
//   <button type="button" className="cancelbtn">
//     Cancel
//   </button>
//   <span className="psw">
//     Forgot <a href="#">password?</a>
//   </span>
// </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Loginda;
