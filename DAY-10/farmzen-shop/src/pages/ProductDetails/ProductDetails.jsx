import React from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../Products/Products";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const product = productsData.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="details">

      <img src={product.image} alt={product.name} />

      <div className="info">
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
        <button>Add to Cart</button>
      </div>

    </div>
  );
};

export default ProductDetails;