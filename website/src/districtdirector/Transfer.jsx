import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Transfer = () => {

  const [username, setUsername] = useState('');
  const [transferto, setTransferto] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  //const [districts, setDistricts] = useState(Alldistricts);
   let districts= [
    { "id": 1, "name": "Srikakulam" },
    { "id": 2, "name": "Vizianagaram" },
    { "id": 3, "name": "Visakhapatnam" },
    { "id": 4, "name": "East Godavari" },
    { "id": 5, "name": "West Godavari" },
    { "id": 6, "name": "Krishna" },
    { "id": 7, "name": "Guntur" },
    { "id": 8, "name": "Prakasam" },
    { "id": 9, "name": "Nellore" },
    { "id": 10, "name": "Chittoor" }
  ];
  
  useEffect(() => {
    // You can remove the axios code since you're directly using the data from Alldistricts.js
  }, []); // Empty dependency array ensures the effect runs only once

  const DD_TRANSFER = import.meta.env.VITE_DD_TRANSFER_ROUTE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(DD_TRANSFER, {
        username,
        transferto,
      });

      if (response.status === 200) {
        setTransferMessage('Transfer successful');
        // You can add further logic here, such as redirecting the user or showing a success message.
      } else {
        setTransferMessage('Transfer failed');
        // You can handle errors here, such as displaying an error message to the user.
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setTransferMessage('Employee Not Found');
    }
  };

  return (
    
    <div className="transfer-li">
        <h1>Transfer</h1>
       
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Transfer to:&nbsp;&nbsp;
          <select
            value={transferto}
            onChange={(e) => setTransferto(e.target.value)}
          >
            <option value="">Select Transfer Location</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Transfer</button>
      </form>

      {transferMessage && <h4>{transferMessage}</h4>}
    </div>
  );
};

export default Transfer;
