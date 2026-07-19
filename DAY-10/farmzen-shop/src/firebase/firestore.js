import app from "./firebaseconfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const db = getFirestore(app);

// Add data
export const addData = async (collectionName, data) => {
  try {
    const res = await addDoc(collection(db, collectionName), data);
    return res.id;
  } catch (error) {
    console.error("Error adding data ❌", error);
  }
};

// Get data
export const getData = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Delete data
export const deleteData = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export default db;