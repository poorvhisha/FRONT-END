import API from "./api";

// Get all products
export const getProducts = async () => {
  try {
    const res = await API.get("/products");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single product
export const getProductById = async (id) => {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};