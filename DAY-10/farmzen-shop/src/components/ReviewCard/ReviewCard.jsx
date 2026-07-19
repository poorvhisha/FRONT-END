import "./ReviewCard.css";
import Rating from "../Rating/Rating";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">

      {/* USER INFO */}
      <div className="review-header">
        <h4>{review.name}</h4>
        <Rating rating={review.rating} />
      </div>

      {/* COMMENT */}
      <p>{review.comment}</p>

    </div>
  );
};

export default ReviewCard;