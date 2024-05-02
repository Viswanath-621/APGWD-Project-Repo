import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dd.css';
import NetworkMap from '../components/NetworkMap';



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


const DDupdate = (props) => {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState([]);
  const [updateValues, setUpdateValues] = useState({}); // Use an object to store update values for each city
  const userDistrict=props.data.userDistrict;  
  const editname=props.data.userName;

  const DD_GET = import.meta.env.VITE_DD_RETRIEVE_ROUTE
  const DD_UPDATE = import.meta.env.VITE_DD_UPDATE_ROUTE
  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get("https://gwlms-ap.onrender.com/ddretrieve", {
        params: { userDistrict },
      });
      setDistrict(response.data);
      
    handleData(userDistrict);
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
        console.log(editname);
      const response = await axios.post(DD_UPDATE, {
        cityId: city._id,
        newValue: updateValues[city._id] || '', // Use the specific updateValue for the city
        editname
      });

      if (response.data.success) {
        // Refresh the data after a successful update
        fetchData();
      } else {
        console.error('Update failed.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  // const [showForm, setShowForm] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

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

  
  const [selectedData, setSelectedData] = useState(null);

  const handleData = (disdata) => {
    setSelectedData(disdata);
  };
  console.log(selectedData);
  console.log(userDistrict)

  return (
    <div className="">

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
          toggleContentVisibility={toggleContentVisibility} // Pass the function to toggle visibility
        />
      )}
    </div>

          </div>
       
    </div>
  );
};

export default DDupdate;
