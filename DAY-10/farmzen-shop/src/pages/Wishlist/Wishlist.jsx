import React, { useState, useEffect } from "react";
import "./Wishlist.css";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setItems(data);
  }, []);

  // 🗑 REMOVE
  const removeItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setItems(updated);
  };

  // ❤️➡️🛒 MOVE TO CART
  const moveToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // duplicate check
    const exists = cart.find((item) => item.id === product.id);

    if (!exists) {
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
    }

    // remove from wishlist
    const updatedWishlist = items.filter((item) => item.id !== product.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setItems(updatedWishlist);

    alert("Moved to cart 🛒");
  };

  return (
    <div className="wishlist">
      <h1>My Wishlist ❤️</h1>

      {items.length === 0 && <p className="empty">No items in wishlist</p>}

      <div className="wishlist-grid">
        {items.map((item) => (
          <div className="wish-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="btns">
              <button
                className="move-btn"
                onClick={() => moveToCart(item)}
              >
                Move to Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;