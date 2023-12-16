import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navibar from "../components/Navibar";
import Transfer from '../districtdirector/Transfer';
import PendingList from '../districtdirector/PendingList';
import ApprovalList from '../districtdirector/ApprovalList';
import DDupdate from '../districtdirector/DDupdate';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState([]);

  const location = useLocation();
  const userName = location.state.name;
  const userDistrict = location.state.district;
  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/adminretrieve", {
        params: { userDistrict },
      });
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
      const response = await axios.post("http://localhost:8000/adminupdate", {
        cityId: city._id,
        newValue: city.value, // Use the specific updateValue for the city
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

  const handleCancel = async (city) => {
    try {
      const response = await axios.post("http://localhost:8000/admincancel", {
        cityId: city._id,
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
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const [showEmployeeForm, setshowEmployeeForm] = useState(false);
  const [showTransferBody, setshowTransferBody] = useState(false);
  const [showPendingBody, setshowPendingBody] = useState(false);
  const [showUploadBody, setShowUploadBody] = useState(false);
  const [showNewEmpBody, setshowNewEmpBody] = useState(false);
  const [showNewStatBody, setshowNewStatBody] = useState(false);

  const handleEmployeeButtonClick = () => {
    // navigate("/filldetails");
    setshowEmployeeForm(true);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
  };

  const handleTransferButtonClick = () => {
    setshowEmployeeForm(false);
    setshowTransferBody(true);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
  };

  const handlePendingButtonClick = () => {
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(true);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
  };

  const handleUploadButtonClick = () => {
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(true);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
  };

  const handleNewEmpButtonClick = () => {
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(true);
    setshowNewStatBody(false);
  };
  const handleNewStatButtonClick = () => {
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(true);
  };

  return (
    <div>
      <Navibar />

      <div className="admin-land">
        <div className="weltext">
          <h1>
            Select Any One&nbsp;<p>Option </p> From Below
          </h1>
        </div>
        <div className="buttons-da">
          <button
            className="button-56"
            // onClick={handleFormButtonClick}
            role="button"
            onClick={handleEmployeeButtonClick}
          >
            Employee values
          </button>
          <button
            className="button-56"
            // onClick={handleExcelButtonClick}
            role="button"
            onClick={handleTransferButtonClick}
          >
            Transfer
          </button>

          <button
            className="button-56"
            // onClick={handleLatLngButtonClick}
            role="button"
            onClick={handlePendingButtonClick}
          >
            pending list
          </button>
        </div>

        <div className="buttons-da">
          <button
            className="button-56"
            // onClick={handleLatLngButtonClick}
            role="button"
            onClick={handleUploadButtonClick}
          >
            update
          </button>

          <button
            className="button-56"
            // onClick={handleLatLngButtonClick}
            role="button"
            onClick={handleNewEmpButtonClick}
          > Approval List
          </button>

          <button
            className="button-56"
            // onClick={handleLatLngButtonClick}
            role="button"
            onClick={handleNewStatButtonClick}
          >
            new station
          </button>
        </div>
      </div>
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
            Welcome, District Director of <span>Hero</span>
          </h1>
          <button>Join the Community</button>
        </div> */}


{showEmployeeForm ? (
      <div className="employee-values">
      <h4
        style={{
          textAlign: "center",
        }}
      >
        Enter the Station Name
      </h4>

      <div className="admin-da">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Station Name"
        />

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
      </div>

      <div className="admin-ta">
        <table border="1">
          <thead>
            <tr>
              <th>Index</th>
              <th>Station Name</th>
              <th>Delta Value</th>
              <th>Updated By</th>
              <th>Date & Time</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {district
              .filter((city) => city.name.includes(search))
              .map((city, index) => {
                const isRed = city.finalvalue === null && city.value !== null;

                // Split the update information
                const updateInfo = city.updatetime.split("At ");
                const updatedBy = updateInfo[0].trim();
                const dateTime = updateInfo[1].trim();

                return (
                  <tr key={city._id} style={{ color: isRed ? "red" : "green" , opacity: 0.6}}>
                    <td>{index + 1}</td>
                    <td>{city.name}</td>
                    <td>{city.value}</td>
                    <td>{`${updatedBy}`}</td>
                    <td>{dateTime}</td>
                    <td>
                      {isRed && (
                        <>
                          <button
                            className="submit-ta"
                            onClick={() => handleUpdate(city)}
                          >
                            Submit Value
                          </button>
                          <button
                            className="cancel-ta"
                            onClick={() => handleCancel(city)}
                          >
                            Cancel Value
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      </div>
      ) : null}

{showTransferBody ? (
      <Transfer/>) : null}
        {showPendingBody ? ( <PendingList data={userDistrict}/>) : null}
        {showNewEmpBody ? ( <ApprovalList data={userDistrict}/>) : null}
        {showUploadBody ? ( <DDupdate data={{ userDistrict, userName }} />) : null}
    </div>
  );
};

export default Admin;
