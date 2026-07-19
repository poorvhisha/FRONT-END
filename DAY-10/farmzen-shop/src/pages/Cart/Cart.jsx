import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];

    // 🔥 quantity default add
    const updated = data.map((item) => ({
      ...item,
      qty: item.qty || 1,
    }));

    setCart(updated);
  }, []);

  // 🔢 TOTAL
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  // 🗑 REMOVE
  const handleRemove = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  // ➕ INCREASE
  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty += 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ➖ DECREASE
  const decreaseQty = (index) => {
    const updated = [...cart];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🔥 CHECKOUT
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customer: "Guest User",
      items: cart,
      total: getTotal(),
      status: "Pending",
    };

    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    localStorage.setItem("cart", JSON.stringify([]));

    alert("Order Placed ✅");
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>

      {cart.length === 0 && <p className="empty">No items in cart</p>}

      <div className="cart-list">
        {cart.map((item, i) => (
          <div className="cart-item" key={i}>
            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              {/* 🔢 QUANTITY */}
              <div className="qty">
                <button onClick={() => decreaseQty(i)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(i)}>+</button>
              </div>
            </div>

            {/* 🗑 REMOVE */}
            <button
              className="remove-btn"
              onClick={() => handleRemove(i)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2 className="total">Total: ₹{getTotal()}</h2>

      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;