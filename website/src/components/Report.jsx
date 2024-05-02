import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Navibar from "../components/Navibar";
import Foot from "../components/Foot";

const Report = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [countData, setCountData] = useState(null); // New state variable for count data
  const [villages, setVillages] = useState([]);
  useEffect(() => {
    // Fetch count data when selectedMonth changes
    if (selectedMonth) {
      fetchCountData(selectedMonth);
    }
  }, [selectedMonth]);

  const handleDownload = () => {
    // Assuming you have data to generate the report
    const reportData = generateReport(selectedMonth);
    // console.log(reportData[0]);

    // Convert report data to CSV format
    const csvData = [
      ["PZ_ID", "District Name", "Mandal Name", "Village Name", "Water Levels"],
      ...reportData,
    ].map((row) => row.join(","));

    // Create a Blob with the CSV data
    const blob = new Blob([csvData.join("\n")], {
      type: "text/csv;charset=utf-8",
    });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, `report_${selectedMonth}.csv`);
  };

  const handleCountDataDownload = () => {
    // Assuming you have data to generate the report for count data
    const countDataReport = generateCountDataReport(countData);

    // Convert count data report to CSV format
    const csvData = [
      [
        "District",
        "No of PZs",
        "PZs WL <3m",
        "PZs WL 3-8m",
        "PZs WL 8-20m",
        "PZs WL >20m",
      ],
      ...countDataReport.map((item) => [
        item.district,
        item.numPZs,
        item.numWLlt3m,
        item.numWL3_8m,
        item.numWL8_20m,
        item.numWLgt20m,
      ]),
    ].map((row) => row.join(","));

    // Create a Blob with the CSV data
    const blob = new Blob([csvData.join("\n")], {
      type: "text/csv;charset=utf-8",
    });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, `count_data_report_${selectedMonth}.csv`);
  };

  const generateReport = (month) => {
    const villagesArray = villages.map((village) => [
      village.PZ_ID,
      village.District,
      village.Mandal,
      village.Village,
      village.finalvalue,
    ]);

    // console.log(" HI "+villagesArray);
    return villagesArray;
  };

  const generateCountDataReport = (countData) => {
    // Generate report data for count data based on the countData array
    // For example, you can map over the countData array and transform it into the desired format for the report

    return countData.map((item) => ({
      district: item.district,
      numPZs: item.numPZs,
      numWLlt3m: item.numWLlt3m,
      numWL3_8m: item.numWL3_8m,
      numWL8_20m: item.numWL8_20m,
      numWLgt20m: item.numWLgt20m,
    }));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const fetchCountData = (month) => {
    const dummyData = generateReport(month);
    const districtGroups = {};

    dummyData.forEach((item) => {
      if (!districtGroups[item[1]]) {
        // Assuming districtName is at index 1
        districtGroups[item[1]] = [];
      }
      districtGroups[item[1]].push(item);
    });

    const countData = Object.entries(districtGroups).map(([district, data]) => {
      return {
        district,
        numPZs: data.length,
        numWLlt3m: data.filter((item) => item[4] < 3).length, // Assuming waterLevels is at index 4
        numWL3_8m: data.filter((item) => item[4] >= 3 && item[4] < 8).length,
        numWL8_20m: data.filter((item) => item[4] >= 8 && item[4] < 20).length,
        numWLgt20m: data.filter((item) => item[4] >= 20).length,
      };
    });

    setCountData(countData); // Update count data state
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/report");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setVillages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowCount = () => {
    // Fetch count data when the button is clicked
    fetchCountData(selectedMonth);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="report">
      {/* <Navibar /> */}
      {/* <div className="burger" onClick={toggleMenu}>
        <span>☰</span>
      </div>

      <div className={`links-da ${isMenuOpen ? "show" : ""}`}>
        <ul>
          <div className="nav-col1">
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="https://apsgwd.ap.gov.in/readmore/real-monitoring">
                NEWS
              </a>
            </li>
            <li>
              <a href="https://apsgwd.ap.gov.in/home?id=award">AWARDS</a>
            </li>
          </div>
          <div className="nav-col2">
            <li>
              <a href="https://apwrims.ap.gov.in/">APWRIMS</a>
            </li>
            <li>
              <a href="https://apsgwd.ap.gov.in/home?id=contact">CONTACT</a>
            </li>
            <li>
              <a href="#about">ABOUT US</a>
            </li>
          </div>
        </ul>
      </div> */}
      <div className="dashboard-container">
        <h1 className="gojo">Welcome, Here you can access the data.</h1>
        {/* <h1></h1> */}
        <div className="dropdown-container">
          <label htmlFor="month-dropdown">
            <b className="gojo">Select Month:</b>
          </label>
          <select
            id="month-dropdown"
            onChange={handleMonthChange}
            value={selectedMonth}
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        {selectedMonth && (
          <div className="table-head">
            <div className="download-container">
              <button
                className="download-button"
                onClick={handleDownload}
                disabled={!selectedMonth}
              >
                Download table in CSV Format.
              </button>
            </div>
            <br />
            <table className="data-table">
              <thead>
                <tr>
                  <th>PZ_ID</th>
                  <th>District</th>
                  <th>Mandal</th>
                  <th>Village</th>
                  <th>Final Value</th>
                </tr>
              </thead>
              <tbody>
                {villages.map((village) => (
                  <tr key={village.PZ_ID}>
                    <td>{village.PZ_ID}</td>
                    <td>{village.District}</td>
                    <td>{village.Mandal}</td>
                    <td>{village.Village}</td>
                    <td>{village.finalvalue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* <button className="count-button" onClick={handleShowCount} disabled={!selectedMonth}>
            Show Count
          </button> */}

        {selectedMonth && countData && (
          <div className="count-table-container">
            <button
              className="count-button"
              onClick={handleCountDataDownload}
              disabled={!countData}
            >
              Download Count Data as Excel
            </button>
            <br />
            <br />
            <table className="count-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>No of PZs</th>
                  <th>PZs WL {"<"}3m</th>
                  <th>PZs WL 3-8m</th>
                  <th>PZs WL 8-20m</th>
                  <th>PZs WL {">"}20m</th>
                </tr>
              </thead>
              <tbody>
                {countData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.district}</td>
                    <td>{item.numPZs}</td>
                    <td>{item.numWLlt3m}</td>
                    <td>{item.numWL3_8m}</td>
                    <td>{item.numWL8_20m}</td>
                    <td>{item.numWLgt20m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* <Foot /> */}
      </div>
    </div>
  );
};

export default Report;
