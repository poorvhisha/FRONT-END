// truncate text
export const truncateText = (text = "", limit = 20) => {
  if (typeof text !== "string") return "";
  return text.length > limit
    ? text.slice(0, limit) + "..."
    : text;
};

// better unique id
export const generateId = () => {
  return crypto.randomUUID();
};

// debounce (safe)
export const debounce = (func, delay = 300) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};