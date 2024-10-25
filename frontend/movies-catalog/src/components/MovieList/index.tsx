"use client";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Movie } from "./interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filterText, setFilterText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${BASE_URL!}/movies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const moviesData = Array.isArray(response.data) ? response.data : [];
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setFilteredMovies([]); // Set to empty array on error
      }
    };

    getMovies();
  }, [router]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setFilterText(text);

    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(text) ||
        movie.gender.toLowerCase().includes(text) ||
        movie.director.toLowerCase().includes(text) ||
        movie.actors.some((actor: string) => actor.toLowerCase().includes(text))
    );

    setFilteredMovies(filtered);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">Lista de Filmes</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Filtrar por título"
          value={filterText}
          onChange={handleFilterChange}
          className="border p-2 w-1/2 md:w-1/3 lg:w-1/4"
        />
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.isArray(filteredMovies) &&
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </ul>
    </div>
  );
}
