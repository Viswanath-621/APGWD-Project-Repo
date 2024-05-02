import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import Navibar from "../components/Navibar";
import AdminNavBar from "./AdminNavBar";
import Foot from "../components/Foot";
import { useNavigate } from "react-router-dom";
import FormDetails from "./FormDetails";
import MapsForm from "../components/MapsForm";
import NetworkMap from "../components/NetworkMap";

//import NTR from "../data/NTR.json";
//import Guntur from "../data/Guntur.json";
//import Alluri from "../data/AlluriSitharamaRaju.json";

import Alluri from "../data/AlluriSitharamaRaju.json";
import Anakapalli from "../data/Anakapalli.json";
import Anantha from "../data/Ananthapuramu.json";
import Annamayya from "../data/Annamayya.json";
import Bapatla from "../data/Bapatla.json";
import Chittoor from "../data/Chittoor.json";
import Ambedkar from "../data/DrBRAmbedkarKonaseema.json";
import East from "../data/EastGodavari.json";
import Eluru from "../data/Eluru.json";
import Guntur from "../data/Guntur.json";
import Kakinada from "../data/Kakinada.json";
import Krishna from "../data/Krishna.json";
import Kurnool from "../data/Kurnool.json";
import Nandyala from "../data/Nandyala.json";
import NTR from "../data/NTR.json";
import Palnadu from "../data/Palnadu.json";
import Parvathi from "../data/ParvathipuramManyam.json";
import Prakasam from "../data/Prakasam.json";
import SPSR from "../data/SPSRNellore.json";
import Srikakulam from "../data/Srikakulam.json";
import SriSathyaSai from "../data/SriSathyaSai.json";
import Tirupati from "../data/Tirupati.json";
import Visakha from "../data/Visakhapatnam.json";
import Vizianagaram from "../data/Vizianagaram.json";
import West from "../data/WestGodavari.json";
import YSR from "../data/YSRKadapa.json";

//john@2022 - GWADPESHI
//pgnw7530 - HSECTION
//Apsgwd123 - APWARIMS

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState([]);
  const [updateValues, setUpdateValues] = useState({}); // Use an object to store update values for each city
  // const {userDistrict}=props.data;
  const location = useLocation();
  const userDistrict = location.state.district;
  const editname = location.state.name;

  const EMP_GET_ROUTE = import.meta.env.VITE_EMPLOYEE_RETRIEVE_ROUTE;
  const EMP_SET_ROUTE = import.meta.env.VITE_EMPLOYEE_UPDATE_ROUTE;

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get("https://gwlms-ap.onrender.com/employeeretrieve", {
        params: { userDistrict },
      });
      setDistrict(response.data);
      
    handleData(userDistrict);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [selectedData, setSelectedData] = useState(null);

  const handleData = (disdata) => {
    setSelectedData(disdata);
  };
  console.log(selectedData);
  
  // console.log(typeof(selectedData));

  // let districtsData = [{ "NTR": NTR }, { "guntur": Guntur },];
  let districtsData = [
    { "Alluri Sitharama Raju": Alluri },
    { "Anakapalli": Anakapalli },
    { "Ananthapuramu": Anantha },
    { "Annamayya": Annamayya },
    { "Bapatla": Bapatla },
    { "Chittoor": Chittoor },
    { "Dr BR Ambedkar Konaseema": Ambedkar },
    { "East Godavari": East },
    { "Eluru": Eluru },
    { "Guntur": Guntur },
    { "Kakinada": Kakinada },
    { "Krishna": Krishna },
    { "Kurnool": Kurnool },
    { "Nandayala": Nandyala },
    { "N.T.R": NTR },
    { "Palnadu": Palnadu },
    { "Parvathipuram Manyam": Parvathi },
    { "Praksasam": Prakasam },
    { "SPSR Nellore": SPSR },
    { "Srikakulam": Srikakulam },
    { "Sri Sathya Sai": SriSathyaSai },
    { "Tirupati": Tirupati },
    { "Visakhapatnam": Visakha },
    { "Vizianagaram": Vizianagaram },
    { "West Godavari": West },
    { "YSR": YSR }
  ];

  console.log(districtsData.find(item => item[selectedData]));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [years, setYears] = useState([]);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();

    
    const currentMonth = new Date().getMonth();
    setSelectedMonth(months[currentMonth]);

    // Generate year options
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, index) => currentYear - index);
    setYears(yearOptions);
    setSelectedYear(currentYear.toString());

  }, []);

  const handleUpdate = async (city) => {
    try {
      const response = await axios.post("https://gwlms-ap.onrender.com/update", {
        cityId: city._id,
        newValue: updateValues[city._id] || "",
        editname,
      });

      if (response.data.success) {
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
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });

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
    navigate("/");
  };

  const [contentVisible, setContentVisible] = useState(true);

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');


  // const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };


  

  // const handleUpload = () => {
  //   if (!file) {
  //     alert('Please select a file.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   axios.post('http://localhost:8000/xupload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
    
  //   .then(response => {
  //     console.log(response.data);
  //     setFile(null);
  //   })
  //   .catch(error => {
  //     console.error('Error uploading file:', error);
  //   });
  // };


  // const handleUpload = () => {
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);

  //     // Send formData to backend endpoint for processing
  //     fetch('http://localhost:8000/xupload', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //     .then(response => {
  //       if (response.ok) {
  //         // File uploaded successfully, handle any UI changes
  //         console.log('File uploaded successfully');
  //       } else {
  //         // Handle error cases
  //         console.error('Failed to upload file');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error uploading file:', error);
  //     });
  //   } else {
  //     console.error('No file selected');
  //   }
  // };

  

  const handleUpload = () => {
    if (selectedFile && selectedMonth && selectedYear) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Construct table name
      const tableName = `villages_${selectedMonth}_${selectedYear}`;

      // Send formData and table name to backend endpoint for processing
      fetch(`https://gwlms-ap.onrender.com/xupload?tableName=${tableName}`, {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (response.ok) {
          // File uploaded successfully, handle any UI changes
          console.log('File uploaded successfully');
        } else {
          // Handle error cases
          console.error('Failed to upload file');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.error('Please select file, month, and year');
    }
  };

  return (
    <div>
      {/* <Navibar /> */}
      <AdminNavBar username={editname} />

      <div className="burger" onClick={toggleMenu}>
        <span>☰</span>
      </div>

      <div className={`links-da ${isMenuOpen ? "show" : ""}`}>
        <ul>
          <li>
            <button className="wierd" role="button" onClick={handleHomeClick}>
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

      <br />
      <div className="Admin-title">
        <h1>
          Welcome {userDistrict} District, Field Officer {editname} !!
        </h1>
        <br />
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
      {contentVisible && (
        <>
          <h1>Choose your Mandal</h1>
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
        </>
      )}
      {selectedData && (
        <NetworkMap
          district={userDistrict}
          data={districtsData.find((item) => item[selectedData])}
          search={search}
          name={editname}
          toggleContentVisibility={toggleContentVisibility} // Pass the function to toggle visibility
        />
      )}
    </div>

          </div>
        ) : null}
      </div>

      <div>
        {showUploadBody && (
          <div className="Excel-da">
            <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year, index) => (
          <option key={index} value={year.toString()}>{year}</option>
        ))}
      </select>
      &nbsp;&nbsp;

          <input type="file" onChange={handleFileChange} />
            <button class="favorite styled" type="button" onClick={handleUpload}>
              Upload your Sheet
            </button>
          </div>
        )}
      </div>

      <div>
        {showLatLngBody && (
          <div className="Latt-da">
            <h1>Click on Allow Access</h1>
            <MapsForm selectedLocation={selectedLocation} />
          </div>
        )}
      </div>
      <div>{showUserProfile && <FormDetails editname={editname} />}</div>
      <div className="welcfoot">
        <Foot />
      </div>
    </div>
  );
};

export default Welcome;
