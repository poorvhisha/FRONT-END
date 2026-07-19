import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Fruits",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    },
    {
      name: "Vegetables",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoIZCZOkJq4Yg00gVdyXr49xxOJsFjSjABE_SAzOiDQ&s=10",
    },
    {
      name: "Dairy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKCKBdXVagXnWejL8RBQL5-Orp7S-WHOKM_vMY03mFhQ&s=10",
    },
  ];

   return (
    <div className="home">

      <div className="hero">
        <h1>Fresh & Healthy Products</h1>
        <p>Choose your category</p>
      </div>

      <div className="category-container">
        {categories.map((item, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate(`/products/${item.name}`)}  // 🔥 IMPORTANT
          >
            <img src={item.image} alt={item.name} />
            <div className="overlay">
              <h2>{item.name}</h2>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;