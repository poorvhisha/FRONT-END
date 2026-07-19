import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import "./App.css";
function App() {
  const [user, setUser] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  if (!user) {
    return <Login setUser={setUser} />;
  }
  if (!selectedClass) {
    return <Dashboard setSelectedClass={setSelectedClass} />;
  }
  return <Attendance selectedClass={selectedClass} />;
}
export default App;