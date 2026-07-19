import { uploadImage } from "../firebase/Storage";

// Upload file
export const uploadFile = async (file) => {
  try {
    const url = await uploadImage(file);
    return url;
  } catch (error) {
    console.error("Upload error ❌", error);
    throw error;
  }
};