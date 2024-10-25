import { FaRegStar, FaStar } from "react-icons/fa6";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  interactive?: boolean;
}

export default function ExternalStarRating({ rating }: StarRatingProps) {
  const numStars = Math.round(rating / 2);

  const fullStars = [];
  const emptyStars = [];

  for (let i = 0; i < 5; i++) {
    if (i < numStars) {
      fullStars.push(i);
    } else {
      emptyStars.push(i);
    }
  }

  return (
    <div className="flex gap-1">
      {fullStars.map((index) => (
        <FaStar className="text-[#f3eb00]" key={index} />
      ))}
      {emptyStars.map((index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
}
