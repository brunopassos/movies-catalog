import { ExternalMovie } from "@/app/external/page";
import ExternalStarRating from "./ExternalStarRating";

interface MovieCardProps {
  movie: ExternalMovie;
}

export default function ExternalMovieCard({ movie }: MovieCardProps) {
  return (
    <li className="text-white w-full h-full rounded-lg overflow-hidden relative group">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.id}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
        />
      </div>
      <div className="absolute bottom-0 h-52 w-full flex flex-col justify-end p-3">
        <p className="text-[#f1f5f9] text-xs">{movie.title}</p>
        <ExternalStarRating rating={movie.vote_average} />
      </div>
    </li>
  );
}
