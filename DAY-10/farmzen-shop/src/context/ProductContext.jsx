import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products] = useState([
    { id: 1, name: "Tomato", price: 30 },
    { id: 2, name: "Carrot", price: 40 },
    { id: 3, name: "Apple", price: 120 },
  ]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;