import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}
export default App;