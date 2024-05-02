import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingList = (props) => {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState([]);
  const userDistrict = props.data;

  // Define the fetchData function
  const DD_PENDING_LIST = import.meta.env.VITE_DD_PENDING_ROUTE;
  const fetchData = async () => {
    try {
      const response = await axios.get("https://gwlms-ap.onrender.com/pendinglist", { params: { userDistrict } });
      setDistrict(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);


  


  return (
    <div className="pending-li">
      <h1>Pending List</h1>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Mandal"
          className="search-input"
        />
      </div>
      <div className="city-list">
        {district
          .filter((city) => city.Mandal.toLowerCase().includes(search.toLowerCase()))
          .map((city) => (
            <div
              key={city._id}
              className="city-item"
              style={{
                borderColor: city.value === null ? 'red' : 'green',
              }}
            >
              {city.Mandal}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PendingList;
