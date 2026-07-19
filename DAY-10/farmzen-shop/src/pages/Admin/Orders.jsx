import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const updateStatus = (id) => {
    const updated = orders.map((o) =>
      o.id === id
        ? { ...o, status: o.status === "Pending" ? "Delivered" : "Pending" }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);
  };

  return (
    <div className="orders">
      <h1>Orders Management</h1>

      {orders.length === 0 && <p>No Orders Yet</p>}

      <div className="orders-grid">
        {orders.map((o) => (
          <div className="order-card" key={o.id}>
            <h3>{o.customer}</h3>

            <p><strong>Items:</strong></p>
            <ul>
              {o.items.map((item, i) => (
                <li key={i}>{item.name} - ₹{item.price}</li>
              ))}
            </ul>

            <p><strong>Total:</strong> ₹{o.total}</p>

            <p className={o.status === "Pending" ? "pending" : "done"}>
              {o.status}
            </p>

            <button onClick={() => updateStatus(o.id)}>
              Mark as {o.status === "Pending" ? "Delivered" : "Pending"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;