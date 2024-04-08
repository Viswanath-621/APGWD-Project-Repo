import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navibar from "../components/Navibar";
import Transfer from "../districtdirector/Transfer";
import PendingList from "../districtdirector/PendingList";
import ApprovalList from "../districtdirector/ApprovalList";
import DDupdate from "../districtdirector/DDupdate";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Foot from "../components/Foot";
import Heroland from "../components/Herosec";
import AdminNavBar from "./AdminNavBar";
import FormDetails from "./FormDetails";

const Admin = () => {
  const [search, setSearch] = useState("");
  const [updateTimeFilter, setUpdateTimeFilter] = useState("");
  const [district, setDistrict] = useState([]);
  const [checkedRecords, setCheckedRecords] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state.name;
  const userDistrict = location.state.district;
  const ADMIN_UPDATE = import.meta.env.VITE_ADMIN_UPDATE_ROUTE;
  const ADMIN_CANCEL = import.meta.env.VITE_ADMIN_CANCEL_ROUTE;
  const ADMIN_RETRIEVE = import.meta.env.VITE_ADMIN_RETRIEVE_ROUTE;

  const ADMIN_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Define the fetchData function
  const fetchData = async () => {
    try {
      // const response = await axios.get("http://localhost:8000/adminretrieve", {

      const response = await axios.get(ADMIN_RETRIEVE, {
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
      const response = await axios.post(ADMIN_UPDATE, {
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
      const response = await axios.post(ADMIN_CANCEL, {
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

  const handleCheckboxChange = (cityId) => {
    setCheckedRecords((prevCheckedRecords) => ({
      ...prevCheckedRecords,
      [cityId]: !prevCheckedRecords[cityId],
    }));
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    const filteredAndSortedCities = district
      .filter(
        (city) =>
          city.name.includes(search) &&
          city.updatetime.includes(updateTimeFilter)
      )
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name) ||
          a.updatetime.localeCompare(b.updatetime)
      );

    const newCheckedRecords = {};

    filteredAndSortedCities.forEach((city) => {
      newCheckedRecords[city._id] = !selectAll;
    });

    setCheckedRecords(newCheckedRecords);
  };

  const handleBulkAction = async (action) => {
    const selectedCityIds = Object.keys(checkedRecords).filter(
      (cityId) => checkedRecords[cityId]
    );

    const ADMIN_ACTION_URL = `${ADMIN_BASE_URL}/admin${action}`;

    if (selectedCityIds.length === 0) {
      console.log("No records selected");
      return;
    }

    try {
      const response = await axios.post(ADMIN_ACTION_URL, {
        cityIds: selectedCityIds,
      });

      if (response.data.success) {
        fetchData();
      } else {
        console.error(`${action} failed.`);
      }
    } catch (error) {
      console.error(`Error ${action} data:`, error);
    }
  };

  const handleUpdateTimeFilter = (e) => {
    setUpdateTimeFilter(e.target.value);
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
  const [showAdminProfile, setShowAdminProfile] = useState(false);
  const [showHomeProfile, setShowHomeProfile] = useState(true);

  const handleHomeClick = () => {
    // Navigate to the home page
    // navigate("/");
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
    setShowHomeProfile(true);
    setShowAdminProfile(false);
    };

  const handleEmployeeButtonClick = () => {
    // navigate("/filldetails");
    setshowEmployeeForm(true);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
    setShowHomeProfile(false)
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

  const handleUploadButtonClick = () => {+
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(true);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
  };

  const handleAdminButtonClick = () => {
    setshowEmployeeForm(false);
    setshowTransferBody(false);
    setshowPendingBody(false);
    setShowUploadBody(false);
    setshowNewEmpBody(false);
    setshowNewStatBody(false);
    setShowAdminProfile(true);
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <AdminNavBar username={userName} />

      <div className="burger" onClick={toggleMenu}>
        <span>☰</span>
      </div>

      <div className={`links-da ${isMenuOpen ? 'show' : ''}`}>
      <ul>
        <div className="nav-col1">
          <li>
          <button className="wierd" role="button" onClick={handleHomeClick}>
              Home
            </button>
          </li>
          <li>
          <button
              className="wierd"
              role="button"
              onClick={handleEmployeeButtonClick}
            >
              Employee values
            </button>
          </li>
          <li>
          <button
              className="wierd" // onClick={handleExcelButtonClick}
              role="button"
              onClick={handleTransferButtonClick}
            >
              Transfer
            </button>
          </li>
          </div>
          <div className="nav-col2">
          <li>
          <button
              className="wierd"
              // onClick={handleLatLngButtonClick}
              role="button"
              onClick={handlePendingButtonClick}
            >
              Pending List
            </button>
          </li>
          <li>
          <button
              className="wierd"
              // onClick={handleLatLngButtonClick}
              role="button"
              onClick={handleNewEmpButtonClick}
            >
              {" "}
              Approval List
            </button>
          </li>
          <li>
          <button
              className="wierd"
              // onClick={handleLatLngButtonClick}
              role="button"
              onClick={handleUploadButtonClick}
            >
              Update
            </button>
          </li></div>
        </ul>
      </div>
      <br/>
    

      {showHomeProfile ? ( <div className="Admin-title" >
        <h1>
          Welcome, {userDistrict} District Director {userName}
        </h1>

        <button
          className="wierd-ad"
          onClick={handleAdminButtonClick}
          role="button"
        >
          Click Here To Check Your Profile
        </button>
      </div>):null};

      
      {/* <div className="admin-land">
        <div className="weltext">         
        </div> */}
        
      {/* <div className="buttons-da">
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
          >
            {" "}
            Approval List
          </button>

          <button
            className="button-56"
            // onClick={handleLatLngButtonClick}
            role="button"
            onClick={handleNewStatButtonClick}
          >
            new station
          </button>
        </div> */}

      {/* </div> */}
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
              placeholder="Search via Station Name"
            />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <input
              type="text"
              value={updateTimeFilter}
              onChange={handleUpdateTimeFilter}
              placeholder="Search via Employee Name"
            />
            <br />
            <div className="check-da">
              <label>Select All</label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
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
                  <th>Select</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {district
                  .filter(
                    (city) =>
                      city.name.includes(search) &&
                      city.updatetime.includes(updateTimeFilter)
                  )
                  .sort(
                    (a, b) =>
                      a.name.localeCompare(b.name) ||
                      a.updatetime.localeCompare(b.updatetime)
                  )
                  .map((city, index) => {
                    const isRed =
                      city.finalvalue === null && city.value !== null;

                    // Split the update information
                    const updateInfo = city.updatetime.split("At ");
                    const updatedBy = updateInfo[0].trim();
                    const dateTime = updateInfo[1].trim();

                    return (
                      <tr
                        key={city._id}
                        style={{ color: isRed ? "red" : "green", opacity: 0.6 }}
                      >
                        <td>{index + 1}</td>
                        <td>{city.name}</td>
                        <td>{city.value}</td>
                        <td>{`${updatedBy}`}</td>
                        <td>{dateTime}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={checkedRecords[city._id] || false}
                            onChange={() => handleCheckboxChange(city._id)}
                          />
                        </td>
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
          <div className="bulk-da">
            <button onClick={() => handleBulkAction("submitall")}>
              Submit Selected
            </button>
            <button onClick={() => handleBulkAction("cancelall")}>
              Cancel Selected
            </button>
          </div>
        </div>
      ) : null}

      {showTransferBody ? <Transfer /> : null}
      {showPendingBody ? <PendingList data={userDistrict} /> : null}
      {showNewEmpBody ? <ApprovalList data={userDistrict} /> : null}
      {showUploadBody ? <DDupdate data={{ userDistrict, userName }} /> : null}

      {showAdminProfile && <FormDetails />}

      <Foot />
    </div>
  );
};

export default Admin;
