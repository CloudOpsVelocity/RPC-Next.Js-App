import React, { Fragment, useState, useId } from "react";
import styles from "@/app/styles/Rating.module.css";
import clsx from "clsx";


interface StarRatingProps {
  onChange?: (rating: number) => void;
  initialRating: number;
  className?: string;
  readOnly?:boolean
}

const RatingStars: React.FC<StarRatingProps> = ({
  onChange,
  initialRating = 0,
  className,
  readOnly
}) => {
  const [rating, setRating] = useState(initialRating);
  const uniqueId = useId();


  const handleChange = (value: number) => {
    if (!onChange) return;
    setRating(value);
    onChange(value);
  };

  return (
    <div className={clsx(styles.starRating, readOnly == true ? "" : styles.unblockStarRating)}>
      {[5, 4, 3, 2, 1].map((star) => (
        <Fragment key={star}>
          <input
            type="radio"
            id={`${uniqueId}-star${star}`}
            name="rating"
            value={star}
            checked={rating == star}
            onChange={() => handleChange(star)}
          />
          <label className={className} htmlFor={`${uniqueId}-star${star}`}>&#9733;</label>
        </Fragment>
      ))}
    </div>
  );
};

export default RatingStars;
