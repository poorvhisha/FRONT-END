import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="splash">

      {/* floating shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>

      {/* main content */}
      <div className="splash-content">
        <h1 className="logo">🌱 FarmZen</h1>
        <p className="tagline">Fresh • Organic • Smart Living</p>

        <div className="dots-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

    </div>
  );
};

export default Splash;