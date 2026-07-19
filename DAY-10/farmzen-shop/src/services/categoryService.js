import API from "./api";

export const getCategories = async () => {
  try {
    const res = await API.get("/products/categories");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};