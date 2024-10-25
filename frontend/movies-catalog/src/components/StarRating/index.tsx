import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  interactive?: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  interactive = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
      setTooltip(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
      setTooltip(null);
    }
  };

  const numStars = 4;

  return (
    <div className="relative flex gap-1">
      {Array.from({ length: numStars }, (_, index) => (
        <span
          key={index}
          className={`cursor-${interactive ? "pointer" : "default"} relative`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {hoverRating !== null && interactive ? (
            index < hoverRating ? (
              <FaStar className="text-[#f3eb00]" />
            ) : (
              <FaRegStar />
            )
          ) : index < rating ? (
            <FaStar className="text-[#f3eb00]" />
          ) : (
            <FaRegStar />
          )}
          {interactive && tooltip === index + 1 && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
              {index + 1}
            </div>
          )}
        </span>
      ))}
    </div>
  );
}
