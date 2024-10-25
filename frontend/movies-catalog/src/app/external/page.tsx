"use client";

import ExternalMovieCard from "@/components/ExternalMovieCard";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export default function ExternalMovies() {
  const [movies, setMovies] = useState<ExternalMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getMovies = (page: number) => {
    axios({
      method: "get",
      url: BASE_URL!,
      params: {
        api_key: "59add50c4f4c821286b9bd82a5124ab9",
        language: "pt-BR",
        page: page,
      },
    }).then((response) => {
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    });
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
        {movies.map((movie) => (
          <ExternalMovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Anterior
        </button>
        <span className="mx-4 text-white">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export interface ExternalMovie {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string;
}
