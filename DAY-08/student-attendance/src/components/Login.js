import React, { useState } from "react";
import "../App.css";
function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (username === "poorvhisha" && password === "poorvhi_12") {
      setUser(username);
    } else {
      alert("Invalid Username or Password");
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="college-name">
          Hindusthan Institute of Technology
        </h1>
        <h2>Faculty Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
export default Login;