import React, { useState } from "react";

interface RatingProps {
  maxStars?: number;
  initialRating?: number;
  onRatingChange?: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating: number) => {
    setRating(clickedRating);
    if (onRatingChange) {
      onRatingChange(clickedRating);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{
            cursor: "pointer",
            color: index < rating ? "gold" : "gray",
          }}
        >
          &#9733; {/* Star character */}
        </span>
      ))}
    </div>
  );
};

export default Rating;
