// 📧 Email validation
export const isValidEmail = (email = "") => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// 🔑 Password validation (min 6 chars)
export const isValidPassword = (password = "") => {
  return password.length >= 6;
};

// 📱 Phone validation (India)
export const isValidPhone = (phone = "") => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

// 🧍 Name validation
export const isValidName = (name = "") => {
  return name.trim().length >= 3;
};

// 🔢 Required field
export const isRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// 💰 Price validation
export const isValidPrice = (price) => {
  return !isNaN(price) && Number(price) > 0;
};

// 🔢 Number validation
export const isNumber = (value) => {
  return !isNaN(value);
};

// 🔐 Confirm password
export const isPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};