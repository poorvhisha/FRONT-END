import React, { useState } from "react";
import "../App.css";
function Dashboard({ setSelectedClass }) {
  const [dept, setDept] = useState("");
  const [section, setSection] = useState("");
  const handleContinue = () => {
    if (dept && section) {
      setSelectedClass(`${dept}-${section}`);
    } else {
      alert("Select Department & Section");
    }
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Select Class</h2>
        <select onChange={(e) => setDept(e.target.value)}>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
        </select>
        <select onChange={(e) => setSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}
export default Dashboard;