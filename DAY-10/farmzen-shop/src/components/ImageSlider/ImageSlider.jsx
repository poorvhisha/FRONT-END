import "./ImageSlider.css";
import { useState } from "react";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <button className="nav-btn" onClick={prev}>‹</button>

      <img key={index} src={images[index]} alt="product" />

      <button className="nav-btn" onClick={next}>›</button>
    </div>
  );
};

export default ImageSlider;