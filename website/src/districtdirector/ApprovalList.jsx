import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dd.css';

const ApprovalList = (props) => {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState([]);

  const DD_APPROVE = import.meta.env.VITE_DD_APPROVE_ROUTE;
  const userDistrict = props.data;

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/approvallist", { params: { userDistrict } });
      setDistrict(response.data);

      console.log(response.data +" jinna");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='approve-li'>
      <center>
        <h1>Approval List</h1>
        <h4>Enter the city</h4>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city..."
        /><br /> 

        <div className="admin-app-ta">
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>PZ_ID</th>
                <th>Mandal</th>
                <th>Village</th>
                <th>Delta Value</th>
                <th>Updated By</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {district
                .filter((city) => city.Mandal.includes(search))
                .map((city, index) => {
                  const isRed = city.finalvalue === null && city.value !== null;
                  const updateInfo = city.updatetime ? city.updatetime.split("At ") : ['', ''];
                  const updatedBy = updateInfo[0].trim();
                  const dateTime = updateInfo[1].trim();

                  return (
                    <tr key={city._id} style={{ color: isRed ? "red" : "green", opacity: 0.6 }}>
                      <td>{index + 1}</td>
                      <td>{city.PZ_ID}</td>
                      <td>{city.Mandal}</td>
                      <td>{city.Village}</td>
                      <td>{city.Value}</td>
                      <td>{`${updatedBy}`}</td>
                      <td>{dateTime}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
};

export default ApprovalList;
