import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dd.css';

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
      const response = await axios.get(DD_GET,{params:{userDistrict}});
      setDistrict(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  return (
    <div className="dd-update ">


      <div className="body">
      
        <div className="container" id="container">
          
          <h1>Enter the city</h1>
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
            /></div>

            <br />
            <center >
        <div className="admin-das">
            
            {district
              .filter((city) => city.name.includes(search))
              .map((city) => (
                <div
                  key={city._id}
                  style={{
                    padding: "10px",
                    color: city.value === null ? "red" : "green",
                  }}
                > <div className="admina">
                  <h3>{city.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u style={{color: "black"}}>Value:</u> {city.value}</h3>
                  
                  
                  {/* Input for updating value */}
                  
                  {city.value === null && (
                    <>
                      <input
                        type="text"
                        value={updateValues[city._id] || ""}
                        onChange={(e) =>
                          setUpdateValues({
                            ...updateValues,
                            [city._id]: e.target.value,
                          })
                        }
                      />
                      <button onClick={() => handleUpdate(city)}>
                        Update Value
                      </button>
                    </>
                  )}</div>
                </div>
              ))}</div>
              
          </center>
          
          {/* <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
                <h1>Hello, Employee!</h1>
                <h2>&nbsp;</h2>
                <p>Enter the location details and let the District Director <br/> decide the value !! </p>
              </div>
            </div>
          </div> */}

{/* <div className="form-container "> */}
            
            
        {/* </div> */}


        </div>
      </div>

      {/* <center>
        <h1>Enter the city</h1>
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
                border: '1px solid black',
                padding: '10px',
                color: city.value === null ? 'red' : 'green',
              }}
            >
              {city.name} 
              {city.value === null && (
                <>
                  <input
                    type="text"
                    value={updateValues[city._id] || ''}
                    onChange={(e) =>
                      setUpdateValues({
                        ...updateValues,
                        [city._id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => handleUpdate(city)}>
                    Update Value
                  </button>
                </>
              )}
            </div>
          ))}
      </center> */}
    </div>
  );
};

export default DDupdate;
