import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">

      <div className="card">

        {/* TOP */}
        <h1>Fresh Grocery 🛒</h1>
        <p className="tagline">
          Fresh • Healthy • Delivered Fast
        </p>

        <p className="desc">
          We provide farm-fresh fruits, vegetables, and dairy products directly
          to your home with quality and care ❤️
        </p>

        {/* FEATURES */}
        <div className="features">

          <div className="box">
            <h3>🌱 Fresh</h3>
            <p>Direct from farms</p>
          </div>

          <div className="box">
            <h3>🚚 Fast</h3>
            <p>Quick delivery</p>
          </div>

          <div className="box">
            <h3>💎 Quality</h3>
            <p>Premium products</p>
          </div>

          <div className="box">
            <h3>💰 Price</h3>
            <p>Affordable</p>
          </div>

        </div>

        {/* STATS */}
        <div className="stats">
          <div>
            <h3>1000+</h3>
            <p>Customers</p>
          </div>
          <div>
            <h3>500+</h3>
            <p>Products</p>
          </div>
          <div>
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="contact">
          <p>📧 support@grocery.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Chennai</p>
        </div>

        <button className="btn">Get in Touch</button>

      </div>

    </div>
  );
};

export default About;