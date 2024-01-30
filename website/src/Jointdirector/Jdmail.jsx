import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

import Navbar from '../components/Navibar'
import Foot from '../components/Foot'

const JD_GET_PENDING = import.meta.env.VITE_DD_PENDING_ROUTE

const fetchallwell = async (userDistrict) => {
  try {
    const response = await axios.get(JD_GET_PENDING, {
      params: { userDistrict },
    });
    console.log(response.data);
    const extractedValues = response.data.map((item) => `${item.name}`);
    console.log(extractedValues);
    const concatenatedString = extractedValues.join('\n');
    return concatenatedString;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const sendEmail = (email, username, rcount, message, district) => {
  emailjs
    .send('service_c17ljwf', 'template_1r4wb0q', { email, username, rcount, message , district}, 'cZVSDv5SxvThNvQw0')
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

const Jdmail = () => {
  const [data, setData] = useState([]);

  const GET_DD_DATA = import.meta.env.VITE_JD_GET_ALLDD_ROUTE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_DD_DATA);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (username, email, district, rcount) => {
    fetchallwell(district).then((message) => {
      sendEmail(email, username, rcount, message, district);
    });
  };

  const sendMailToAll = async () => {
    // Loop through each item in the data array and send email
    for (const item of data) {
      const message = await fetchallwell(item.district);
      sendEmail(item.email, item.username, item.rcount, message);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="jd-mail">
      <button onClick={sendMailToAll}>Send Mail to All</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <div>
              <p style={{ marginRight: '10px' }}>Username: {item.username}</p>
              <p style={{ marginRight: '10px' }}>District: {item.district}</p>
              {/* <p style={{ marginRight: '10px' }}>Remaining Count: {item.rcount}</p> */}
              <p>Email: {item.email}</p>
              <button onClick={() => handleSubmit(item.username, item.email, item.district, item.rcount)}>
                Send Mail
              </button>
            </div>
          </li>
        ))}
      </ul></div>
      <Foot/>
    </div>
  );
};

export default Jdmail;
