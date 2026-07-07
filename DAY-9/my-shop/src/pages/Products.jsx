import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products";
const Products = () => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const categories = ["All", ...new Set(productsData.map(p => p.category))];
  const filtered =
    category === "All"
      ? productsData
      : productsData.filter(p => p.category === category);
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Fresh Store</h1>
      {/* Categories */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 15px",
              borderRadius: "20px",
              border: "none",
              background: category === cat ? "#4CAF50" : "#eee",
              color: category === cat ? "white" : "black",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Products */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px"
        }}
      >
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <img src={item.image} alt={item.name} width="120" height="120" />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;