import { useState } from "react";
import StarRating from "../StarRating";

interface MovieVoteModalProps {
  movie: {
    id: string;
    title: string;
    director: string;
    gender: string;
    actors: string[];
    image_url: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onVote: (rating: number, movieId: string) => void;
}

export default function MovieVoteModal({
  movie,
  isOpen,
  onClose,
  onVote,
}: MovieVoteModalProps) {
  const [rating, setRating] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-lg p-6 w-11/12 sm:w-1/2 max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          <img
            src={movie.image_url}
            alt={movie.title}
            className="w-48 h-72 object-cover mb-4 rounded-lg shadow-md"
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-semibold">Diretor:</span> {movie.director}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-semibold">Gênero:</span> {movie.gender}
          </p>
          <p className="text-sm text-gray-700 font-semibold mt-4">Elenco:</p>

          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            {movie.actors.map((actor) => (
              <li
                key={`${movie.title}-${actor}`}
                className="pl-4 list-disc list-inside"
              >
                {actor}
              </li>
            ))}
          </ul>

          <div className="mb-4 text-center">
            <p className="mb-2 font-semibold text-gray-800">Sua Avaliação:</p>
            <StarRating
              rating={rating}
              onRatingChange={(newRating) => setRating(newRating)}
              interactive
            />
          </div>

          <button
            onClick={() => {
              onVote(rating, movie.id);
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold transition duration-300"
          >
            Confirmar Voto
          </button>
        </div>
      </div>
    </div>
  );
}
