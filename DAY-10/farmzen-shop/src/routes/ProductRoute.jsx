import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProductRoute = ({ children }) => {
  const { user } = useAuth();

  // user login இல்லனா redirect
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProductRoute;