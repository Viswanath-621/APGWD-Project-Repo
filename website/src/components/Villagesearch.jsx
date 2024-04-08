import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VillageSearch() {
  const [district, setDistrict] = useState('Dr BR Ambedkar Konaseema');
  const [mandal, setMandal] = useState('Alamuru');
  const [villages, setVillages] = useState([]);
  
  // Fetch data function
  async function fetchData(district, mandal) {
    try {
      const response = await axios.get('http://localhost:8000/villages', {
        params: { district, mandal }
      });
      setVillages(response.data);
    } catch (error) {
      console.log('Error retrieving villages:', error);
    }
  }

  // useEffect to fetch data
  useEffect(() => {
    // Call the fetchData function
    fetchData(district, mandal);
  }, [district, mandal]); // Include district and mandal as dependencies

  return (
    <div className='villages'>
      <div className="slt-village">
      {villages.length > 0 ? (
        villages.map((village, index) => (
          <div key={index}>
            <button className='village-button'>Village: {village.VILLAGE}</button>
            <button className='village-button'>Location: {village.LOCATION}</button>
            <button className='village-button'>PZ ID: {village.PZ_ID}</button>
            <button className='village-button'>Site ID: {village["SITE ID"]}</button>
            {/* Add more h1 tags for additional values */}
          </div>
        ))
      ) : (
        <h1>No data available</h1>
      )}
    </div>
    </div>
  ); 
}

export default VillageSearch;
