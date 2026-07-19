import app from "./firebaseconfig";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

const storage = getStorage(app);

// Upload image
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Upload error ❌", error);
  }
};

export default storage;