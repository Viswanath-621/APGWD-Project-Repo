import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navibar from "../Navibar";

function Signup() {
    const [name,setName] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    
  const divStyle = {
    backgroundImage: 'url("signbg.png")'
  };

  const divlStyle = {
    backgroundImage: "url('/login-bg.png')"
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://apgwd-backend-service.onrender.com/signup", {name, email, password })
        .then(res => {console.log(res)
            navigate('/login')
        })
        .catch(err=> console.log(err))
    }

    return (
        <div>
            <Navibar/>
        <div className="login-container" style={divStyle}>
            <div className="login-content" style={divlStyle}>
                <h2>SignUP Now</h2> <br/>
                <form onSubmit={handleSubmit}>

                <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label> <br/>

                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                  
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label> <br/>

                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label> <br/>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>

                <div className="signup-btn">
                <p>Already have an account?
                <Link to="/Login">
                    Sign In Now 
                </Link></p>
                </div>
                
            </div>
        </div>
        </div>
    );
}

export default Signup;


















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
//         <div class="container">
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

          // <div class="container-f">
          //   <button type="button" class="cancelbtn">
          //     Cancel
          //   </button>
          //   <span class="psw">
          //     Forgot <a href="#">password?</a>
          //   </span>
          // </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Loginda;
