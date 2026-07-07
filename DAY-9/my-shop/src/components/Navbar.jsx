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
<div style={{ padding: "20px" }}> <h1>Fresh Store</h1>
  {/* TOP CATEGORIES */}
  <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
  {/* PRODUCTS GRID */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: "20px" }}>
    {filtered.map(item => (
      <div
        key={item.id}
        onClick={() => navigate(`/product/${item.id}`)}
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "10px",
          textAlign: "center",
          cursor: "pointer"
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
