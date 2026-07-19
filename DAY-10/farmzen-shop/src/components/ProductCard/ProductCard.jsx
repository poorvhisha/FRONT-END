import "./ProductCard.css";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;