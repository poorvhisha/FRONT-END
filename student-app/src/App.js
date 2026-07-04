import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { name: "Arun", present: true },
    { name: "Priya", present: false },
    { name: "Karthik", present: true },
  ]);

  const toggleAttendance = (index) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const getPercentage = () => {
    const presentCount = students.filter(s => s.present).length;
    return Math.round((presentCount / students.length) * 100);
  };

  return (
    <div className="app">
      <h1>Student Attendance</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td
                className={student.present ? "present" : "absent"}
                onClick={() => toggleAttendance(index)}
              >
                {student.present ? "Present" : "Absent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className={getPercentage() < 75 ? "low" : "ok"}>
        Attendance: {getPercentage()}%
      </h3>
    </div>
  );
}

export default App;