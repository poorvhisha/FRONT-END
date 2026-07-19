import "./Rating.css";
import { FaStar } from "react-icons/fa";

const Rating = ({ rating = 0, onRate }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "filled" : ""}
          onClick={() => onRate && onRate(star)} // optional click
        />
      ))}
    </div>
  );
};

export default Rating;