import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const FieldOfficerData = ({ mandal, district }) => {
  // const { Pz_id, district, mandal  } = item;

  const [villages, setVillages] = useState([]);
  // const [Pz_id, setPz_id] = useState("189");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function fetchData(district, mandal) {
    try {
      const response = await axios.get("http://localhost:8000/villages", {
        params: { district, mandal },
      });
      setVillages(response.data);
    } catch (error) {
      console.log("Error retrieving villages:", error);
    }
  }

  useEffect(() => {
    fetchData(district, mandal);
  }, [district, mandal]);

  return (
    <div className="Main-Field-form">
      <h2>Fill the Form for {mandal}</h2>
      <div className="field-form-container">
        <form className="field-form" onSubmit={handleSubmit}>
          {villages.length > 0 ? (
            <div className="form-group">
              <label htmlFor="Pz_id">Pz_id:</label>
              <select
                id="Pz_id"
                value={selectedPzId}
                onChange={handleSelectPzId}
              >
                <option value="">Select PZ ID</option>
                {villages.map((village, index) => (
                  <option key={index} value={village.PZ_ID}>
                    {village.PZ_ID}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <h1>No data available</h1>
          )}
          <div className="form-group">
            <label htmlFor="district">District:</label>
            <input type="text" id="district" value={district} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="mandal">Mandal:</label>
            <input type="text" id="mandal" value={mandal} disabled />
          </div>
          {villages.length > 0 ? (
            <div className="form-group">
              <label htmlFor="village">Village:</label>
              <select
                id="village"
                value={selectedVillage}
                onChange={handleSelectVillage}
              >
                <option value="">Select Village</option>
                {villages.map((village, index) => (
                  <option key={index} value={village.VILLAGE}>
                    {village.VILLAGE}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <h1>No data available</h1>
          )}
          <div className="form-group">
            <label htmlFor="delta">Delta Value:</label>
            <input type="text" id="delta" />
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
