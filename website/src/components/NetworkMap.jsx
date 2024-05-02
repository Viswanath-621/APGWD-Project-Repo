import React from "react";
import FieldOfficerData from "./FieldOfficerData";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const NetworkMap = ({ district, data, search,toggleContentVisibility, name }) => {
  // console.log(name);
  const dataArray = Object.values(data);
  console.log(dataArray);
  const filteredData = dataArray[0].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );
  const [clickedItem, setClickedItem] = useState(null); 
  const [buttondata, setButtondata] = useState(1);
  
  const navigate = useNavigate();

  const handleClick = (item) => {
    setClickedItem(item); 
    setButtondata(null);
    toggleContentVisibility();
    // navigate('/village');
  };

  return (
    <div className="man-button-container">
      {buttondata && (filteredData.map((item, index) => (
        <button key={index} onClick={() => handleClick(item)}>
          {item}
        </button>
      )))}

      {clickedItem && (<FieldOfficerData name={name} district={district} mandal={clickedItem} />)}
    </div>
  );
};

export default NetworkMap;
