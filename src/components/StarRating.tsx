import React, { useState, FC, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  /** The initial rating value to display. */
  initialRating?: number;
  /** The total number of stars to display. */
  totalStars?: number;
  /** Callback function that is called when the rating is changed. */
  onRatingChange?: (rating: number) => void;
  /** If true, the rating cannot be changed. */
  readOnly?: boolean;
  /** The size of the star icons. */
  size?: number;
  /** Optional additional class names for the container. */
  className?: string;
}

const StarRating: FC<StarRatingProps> = ({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
  readOnly = false,
  size = 20,
  className = '',
}) => {
  console.log('StarRating loaded');

  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Sync state with prop changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (ratingValue: number) => {
    if (readOnly) return;
    setRating(ratingValue);
    if (onRatingChange) {
      onRatingChange(ratingValue);
    }
  };

  const handleMouseEnter = (ratingValue: number) => {
    if (readOnly) return;
    setHover(ratingValue);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHover(0);
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hover || rating);

        return (
          <button
            type="button"
            key={ratingValue}
            aria-label={`Rate ${ratingValue} out of ${totalStars} stars`}
            disabled={readOnly}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            className={`p-0 bg-transparent border-none ${!readOnly ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              size={size}
              className={`transition-colors duration-200 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
              fill={isFilled ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;