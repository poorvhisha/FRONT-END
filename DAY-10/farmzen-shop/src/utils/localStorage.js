// set item
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Storage set error ❌", err);
  }
};

// get item
export const getItem = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Storage parse error ❌", err);
    return null;
  }
};

// remove item
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Storage remove error ❌", err);
  }
};

// clear all
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("Storage clear error ❌", err);
  }
};