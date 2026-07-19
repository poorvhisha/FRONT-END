import React from "react";
import { Routes, Route } from "react-router-dom";


// Pages
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import About from "../pages/About/About";


// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";


// Protected Routes
import AdminRoute from "./AdminRoute";
import ProductRoute from "./ProductRoute";


function AppRoutes() {

  return (

    <Routes>


      {/* Home */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />


      {/* Login */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />


      {/* Products */}
      <Route
        path="/products"
        element={
          <MainLayout>
            <ProductRoute>
              <Products />
            </ProductRoute>
          </MainLayout>
        }
      />


      {/* Product Details */}
      <Route
        path="/product/:id"
        element={
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        }
      />


      {/* Cart */}
      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />


      {/* Wishlist */}
      <Route
        path="/wishlist"
        element={
          <MainLayout>
            <Wishlist />
          </MainLayout>
        }
      />


      {/* Profile */}
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />


      {/* Settings */}
      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />


      {/* About */}
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />


      {/* Admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <MainLayout>

              <div>
                <h2>Admin Dashboard</h2>
                <p>Welcome Admin 🚀</p>
              </div>

            </MainLayout>
          </AdminRoute>
        }
      />


      {/* 404 */}
      <Route
        path="*"
        element={
          <h1>
            404 - Page Not Found
          </h1>
        }
      />


    </Routes>

  );
}


export default AppRoutes;