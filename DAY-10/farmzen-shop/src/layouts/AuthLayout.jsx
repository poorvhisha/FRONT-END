import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1f2937, #111827)"
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "30px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;