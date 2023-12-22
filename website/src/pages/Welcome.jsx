import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import Navibar from "../components/Navibar";
import AdminNavBar from "./AdminNavBar";
import Foot from "../components/Foot";
import { useNavigate } from "react-router-dom";
import FormDetails from "./FormDetails";


const Welcome = () => {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState([]);
  const [updateValues, setUpdateValues] = useState({}); // Use an object to store update values for each city
  // const {userDistrict}=props.data;
  const location = useLocation();
  const userDistrict = location.state.district;
  const editname = location.state.name;
  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apgwdback.onrender.com/employeeretrieve",
        { params: { userDistrict } }
      );
      setDistrict(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (city) => {
    try {
      const response = await axios.post("https://apgwdback.onrender.com/update", {
        cityId: city._id,
        newValue: updateValues[city._id] || "", // Use the specific updateValue for the city
        editname,
      });

      if (response.data.success) {
        // Refresh the data after a successful update
        fetchData();
      } else {
        console.error("Update failed.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const [expand, setExpand] = useState(false);

  const handleCtaClick = () => {
    setExpand((prevExpand) => !prevExpand);
    setShowForm(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
    setShowForm(false);
    setShowUploadBody(false);
    setShowLatLngBody(false);
  };

  const navigate = useNavigate();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUploadBody, setShowUploadBody] = useState(false);
  const [showLatLngBody, setShowLatLngBody] = useState(false);

  const handleFormButtonClick = () => {
    // navigate("/filldetails");
    setShowForm(true);
    setShowUploadBody(false);
    setShowLatLngBody(false);
    setShowUserProfile(false);
  };

  const handleExcelButtonClick = () => {
    setShowForm(false);
    setShowUploadBody(true);
    setShowLatLngBody(false);
    setShowUserProfile(false);

  };

  const handleLatLngButtonClick = () => {
    setShowForm(false);
    setShowUploadBody(false);
    setShowLatLngBody(true);
    setShowUserProfile(false);

  };
  const handleUserButtonClick = () => {
    setShowForm(false);
    setShowUploadBody(false);
    setShowLatLngBody(false);
    setShowUserProfile(true);

  };
  const handleHomeClick = () => {
    // Navigate to the home page
    navigate("/")
  };
  

  return (
    <div>
      {/* <Navibar /> */}
      <AdminNavBar username={editname} />

      <div className="links-da">
        <ul>
          <li>
          <button
              className="wierd"
              role="button"
              onClick={handleHomeClick}
            >
              Home
            </button>
          </li>
          <li>
          <button
            className="wierd"
            onClick={handleFormButtonClick}
            role="button"
          >
            Enter details via form
          </button>
          </li>
          <li>
          <button
            className="wierd"
            onClick={handleExcelButtonClick}
            role="button"
          >
            Upload details via Excel file
          </button>
          </li>
          <li>
          <button
            className="wierd"
            onClick={handleLatLngButtonClick}
            role="button"
          >
            Lattitude and Longitude
          </button>
          </li>
          <li>
          <button
           className="wierd"
            onClick={handleUserButtonClick}
            role="button"
          >
            User Profile
          </button>
          </li>
          {/* <li>
            <a href="#about">ABOUT US</a>
          </li> */}
        </ul>
      </div>

      <div className="Admin-title">
        <h1>
          Welcome, {userDistrict} Employee {editname} 
        </h1>
        </div>



      {/* <div className="admin-land">
        <div className="weltext">
          
        </div>
        
      </div> */}
      {/* <div className={`wrapper`}>
        <div className={`login-text ${isExpanded ? "expand" : ""}`}>
          <button className="cta" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </button>
          <div className={`text ${isExpanded ? "show-hide" : ""}`}>
            
          </div>
        </div>
        <div className="call-text">
          <h1>
            Welcome, Employee of the District <span>Hero</span>
          </h1>
          <button>Join the Community</button>
        </div>
      </div> */}

      <div>
        {showForm ? (
          <div className="body">
            <div className="container" id="container">
              <h1>Enter the city</h1>
              <div className="emplo-city">
                <button className="btn-search" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
                </button>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-p"
                />
              </div>

              <br />
              <center>
                <div className="admin-das">
                  {district
                    .filter((city) => city.name.includes(search))
                    .map((city) => (
                      <div
                        key={city._id}
                        style={{
                          padding: "10px",
                          color: city.value === null ? "red" : "green",
                        }}
                      >
                        {" "}
                        <div className="admina">
                          <h3>
                            {city.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <u style={{ color: "black" }}>Value:</u>{" "}
                            {city.value}
                          </h3>
                          {city.image && (
                            <img
                              src={city.image}
                              alt={`Image for ${city.name}`}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "60px",
                                
                              }}
                            />
                          )}

                          {/* Input for updating value */}

                          {city.value === null && (
                            <>
                              <input
                                type="text"
                                value={updateValues[city._id] || ""}
                                onChange={(e) =>
                                  setUpdateValues({
                                    ...updateValues,
                                    [city._id]: e.target.value,
                                  })
                                }
                              />
                              <button onClick={() => handleUpdate(city)}>
                                Update Value
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </center>

              {/* <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
                <h1>Hello, Employee!</h1>
                <h2>&nbsp;</h2>
                <p>Enter the location details and let the District Director <br/> decide the value !! </p>
              </div>
            </div>
          </div> */}

              {/* <div className="form-container "> */}

              {/* </div> */}
            </div>
          </div>
        ) : null}
      </div>

      <div>
        {showUploadBody && (
          <div className="Excel-da">
            <h1>Need to create the button </h1>
          </div>
        )}
      </div>

      <div>
        {showLatLngBody && (
          <div className="Latt-da">
            <h1>Need to use phone location</h1>
          </div>
        )}
      </div>
      <div>
      {showUserProfile && (
          <FormDetails />
        )}
      </div>
      <div className="welcfoot">
        <Foot />
      </div>
    </div>
  );
};

export default Welcome;
