import "./HeroBanner.css";
import { FaArrowRight } from "react-icons/fa";
const HeroBanner = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-tag">
          NEW COLLECTION 2026
        </span>
        <h1>
          Discover <span>Premium Products</span>
        </h1>
        <p>
          Explore thousands of quality products with
          premium design, modern technology and
          unbeatable prices.
        </p>
        <div className="hero-buttons">
          <button className="shop-btn">
            Shop Now
            <FaArrowRight />
          </button>
          <button className="learn-btn">
            Learn More
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="/images/banner.png"
          alt="Hero Banner"
        />
      </div>
    </section>
  );
};
export default HeroBanner;