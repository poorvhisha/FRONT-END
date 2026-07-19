import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Future: role check (optional)
  // if (user.role !== "admin") return <Navigate to="/" />

  return children;
};

export default AdminRoute;