import React from "react";

const NetworkMap = ({ data, search }) => {
  // console.log(data);
  const dataArray = Object.values(data);
  const filteredData = dataArray[0].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="man-button-container">
      {/* Map over the filtered data instead of the original data */}
      {filteredData.map((item, index) => (
        <button key={index}>{item}</button>
      ))}
    </div>
  );
};

export default NetworkMap;
