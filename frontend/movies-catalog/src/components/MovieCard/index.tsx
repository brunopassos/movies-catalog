import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import router from "next/router";
import { useState } from "react";
import MovieVoteModal from "../MovieVoteModal";
import StarRating from "../StarRating";

interface Movie {
  id: string;
  title: string;
  director: string;
  gender: string;
  actors: string[];
  rating: number;
  image_url: string;
}

interface MovieCardProps {
  movie: Movie;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function MovieCard({ movie }: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
    return;
  }
  const decodedToken = jwt.decode(token) as jwt.JwtPayload | null;
  const userId = (decodedToken?.sub as string) || null;
  const userRole = (decodedToken?.role as string) || null;
  const handleVote = async (rating: number, movieId: string) => {
    try {
      await axios.post(
        `${BASE_URL}/ratings`,
        {
          rating,
          movieId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error);
    }

    setUserRating(rating);
  };

  return (
    <li className="text-white w-full h-full rounded-lg overflow-hidden relative group">
      <div>
        <img
          src={movie.image_url}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
        />
      </div>
      <div className="absolute bottom-0 h-52 w-full flex flex-col justify-end p-3">
        <p className="text-[#f1f5f9] text-xs">{movie.title}</p>
        <StarRating rating={movie.rating} />
        <div className="text-white text-xs mt-2 h-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:h-[120px]">
          <p>{movie.director}</p>
          <p>{movie.gender}</p>

          {userRole && userRole === "user" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mt-2 w-full"
            >
              Avaliar
            </button>
          )}
        </div>
      </div>

      <MovieVoteModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVote={handleVote}
      />
    </li>
  );
}
