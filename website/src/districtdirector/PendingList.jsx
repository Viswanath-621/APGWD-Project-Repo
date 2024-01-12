import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingList = (props) => {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState([]);
  const userDistrict=props.data;
  // Define the fetchData function
  const DD_PENDING_LIST = import.meta.env.VITE_DD_PENDING_ROUTE
  const fetchData = async () => {
    try {
      const response = await axios.get(DD_PENDING_LIST,{params:{userDistrict}});
      setDistrict(response.data);
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
      <center>
        <h1>PendingList</h1>
        <h4>Enter the city</h4>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /><br />

        {district
          .filter((city) => city.name.includes(search))
          .map((city) => (
            <div
              key={city._id}
              style={{
                // border: '1px solid black',
                padding: '10px',
                color: city.value === null ? 'red' : 'green',
              }}
            >
              {city.name}
              
            </div>
          ))}
      </center>
    </div>
  );
};

export default PendingList;
