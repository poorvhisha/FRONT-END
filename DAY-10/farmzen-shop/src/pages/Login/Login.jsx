import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = (e)=>{
    e.preventDefault();

    if(password === "admin123"){
      navigate("/");
    }
    else{
      alert("Invalid Password");
    }
  };


  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Welcome Back</h2>

        <p>Login to your Product Catalog</p>


        <form onSubmit={handleLogin}>


          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>



          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

          </div>



          <div className="login-options">

            <label>
              <input type="checkbox"/>
              Remember me
            </label>

            <span>
              Forgot Password?
            </span>

          </div>



          <button type="submit">
            Login
          </button>


        </form>


        <div className="signup-text">

          Don't have an account?
          <span> Sign Up</span>

        </div>


      </div>


    </div>

  );
};


export default Login;