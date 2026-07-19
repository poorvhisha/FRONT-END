import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", color: "#fff" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "linear-gradient(180deg, #111827, #1f2937)",
          padding: "20px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.5)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {["Dashboard", "Products", "Orders", "Users"].map((item) => (
            <li
              key={item}
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#374151")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;