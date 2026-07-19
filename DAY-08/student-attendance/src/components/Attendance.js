import React, { useState } from "react";
import studentsData from "../data/students";
import "../App.css";
function Attendance({ selectedClass }) {
  const students = studentsData[selectedClass] || [];
  const [attendance, setAttendance] = useState({});
  const handleCheck = (name) => {
    setAttendance({
      ...attendance,
      [name]: !attendance[name]
    });
  };
  const total = students.length;
  const present = Object.values(attendance).filter(v => v).length;
  const absent = total - present;
  return (
    <div className="attendance-container">
      <h2>{selectedClass} Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheck(student)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" ">
        <h3>Summary</h3>
        <p>Total Strength: {total}</p>
        <p>Present: {present}</p>
        <p>Absent: {absent}</p>
      </div>
    </div>
  );
}
export default Attendance;