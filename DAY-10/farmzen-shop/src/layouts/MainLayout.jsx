import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "#111827",
          color: "#fff",
          padding: "20px"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>My App</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {["Home", "Shop", "Cart", "Wishlist"].map((item) => (
            <li
              key={item}
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px", color: "#fff" }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;