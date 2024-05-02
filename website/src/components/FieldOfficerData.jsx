import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const FieldOfficerData = ({ mandal, district, name }) => {
  // const { Pz_id, district, mandal  } = item;

  const [villages, setVillages] = useState([]);
  // const [Pz_id, setPz_id] = useState("189");

  const [selectedPzId, setSelectedPzId] = useState(""); // Declare selectedPzId state variable
  const [selectedVillage, setSelectedVillage] = useState(""); // Declare selectedVillage state variable
  const [deltaValue, setDeltaValue] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("https://gwlms-ap.onrender.com/update", {
        params: {
          PZ_ID: selectedPzId,
          // District: district,
          // Mandal: mandal,
          // Village: selectedVillage,
          newValue: deltaValue,
          editname: name, 
        },
      });

      console.log("Response from server:", response.data);

      // Clear form fields after successful submission
      setSelectedPzId("");
      setSelectedVillage("");
      setDeltaValue("");
      setImageFile(null);
    } catch (error) {
      console.error("Error updating village:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  async function fetchData(district, mandal) {
    try {
      const response = await axios.get("https://gwlms-ap.onrender.com/villages", {
        params: { district, mandal },
      });
      setVillages(response.data);
      console.log(response.data + "jaanu");
    } catch (error) {
      console.log("Error retrieving villages:", error);
    }
  }

  useEffect(() => {
    fetchData(district, mandal);
  }, [district, mandal]);

  // console.log("hi");
  console.log(villages);
  return (
    <div className="Main-Field-form">
      <h2>Fill the Form for {mandal}</h2>
      <div className="field-form-container">
        <form className="field-form" onSubmit={handleSubmit}>
        {/* <div className="form-group select-container">
        {villages.length > 0 ? (
  <div className="form-group">
    <label htmlFor="Pz_id">Pz_id:</label>
    <select
      id="Pz_id"
      value={selectedPzId}
      onChange={(e) => setSelectedPzId(e.target.value)}
    >
      <option value="">Select PZ ID</option>
      {villages.map((village, index) => (
        village.Value === null && (
          <option key={index} value={village.PZ_ID}>
            {village.PZ_ID}
          </option>
        )
      ))}
    </select>
  </div>
) : (
  <h1>No data available</h1>
)}
 </div> */}
          <div className="form-group">
            <label htmlFor="district">District:</label>
            <input type="text" id="district" value={district} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="mandal">Mandal:</label>
            <input type="text" id="mandal" value={mandal} disabled />
          </div>

          <div className="form-group select-container">
          {/* {villages.length > 0 ? ( */}
  <div className="form-group">
    <label htmlFor="village">Village:</label>
    <select
      id="village"
      value={selectedVillage}
      onChange={(e) => setSelectedVillage(e.target.value)}
    >
      <option value="">Select Village</option>
      {villages.map((village) => (
        village.Value !== null && (
          <option key={village._id} value={village.Village}>
            {village.Village}
          </option>
        )
      ))}
    </select>
  </div>
{/* ) : ( */}
{/* )} */}
 </div>
          <div className="form-group">
            <label htmlFor="delta">Delta Value:</label>
            <input type="text" id="delta" 
                value={deltaValue} 
                onChange={(e) => setDeltaValue(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input type="file" id="image" accept="image/*" />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FieldOfficerData;
