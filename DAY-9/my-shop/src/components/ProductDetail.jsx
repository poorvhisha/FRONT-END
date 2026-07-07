import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products";
const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);
  if (!product) return <h2>Product not found</h2>;
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} width="200" />
      <h3>₹{product.price} / kg</h3>
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={qty}
          min="1"
          onChange={(e) => setQty(e.target.value)}
          style={{ padding: "5px", width: "80px" }}
        />
      </div>
      <h2>Total: ₹{product.price * qty}</h2>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() =>
          alert(product.name + " added (" + qty + " kg)")
        }
      >
        Add to Cart
      </button>
    </div>
  );
};
export default ProductDetail;