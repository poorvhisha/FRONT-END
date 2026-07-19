import API from "./api";

// Login
export const loginService = async (email, password) => {
  try {
    const res = await API.post("/auth/login", {
      username: email,
      password
    });

    // Save token
    localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register (mock)
export const registerService = async (userData) => {
  return {
    message: "User registered (mock) ✅",
    userData
  };
};