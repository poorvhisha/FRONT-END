import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "./Navbar.css";

const Navbar = () => {
  const { cart, wishlist } = useContext(ShopContext);

  return (
    <nav className="navbar">
      <h2>Trendify ✨</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
      </div>
    </nav>
  );
};

export default Navbar;