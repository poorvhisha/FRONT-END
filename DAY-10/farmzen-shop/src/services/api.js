import axios from "axios";

const API = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔥 Request interceptor (future token use)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 Response interceptor (error handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error ❌", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;