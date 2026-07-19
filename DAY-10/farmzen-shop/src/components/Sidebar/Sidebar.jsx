import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaCog,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import "./Sidebar.css";
const Sidebar = () => {
  const menu = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Wishlist", path: "/wishlist", icon: <FaHeart /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingCart /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Product Catalog</h2>
      </div>
      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default Sidebar;