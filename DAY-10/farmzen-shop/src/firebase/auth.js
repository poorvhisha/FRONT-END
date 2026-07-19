import app from "./firebaseconfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const auth = getAuth(app);

// Register
export const registerUser = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};

export default auth;