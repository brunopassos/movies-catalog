import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateMovieDto, MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private readonly movies: MovieDto[] = [];
  create(createMovieDto: CreateMovieDto): MovieDto {
    const movieAlreadyExists = this.movies.find(
      (movie) => movie.title === createMovieDto.title,
    );

    if (movieAlreadyExists) {
      throw new HttpException(`Movie already exists.`, HttpStatus.BAD_REQUEST);
    }

    const newMovie: MovieDto = {
      id: uuid(),
      ...createMovieDto,
      rating: 0,
    };

    this.movies.push(newMovie);

    return newMovie;
  }

  findAll() {
    return this.movies;
  }

  findOne(id: string): MovieDto {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new HttpException('Movie not found.', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  findWithFilters(filters: Partial<MovieDto>): MovieDto[] {
    return this.movies.filter((movie) => {
      return (
        !filters.title ||
        (movie.title.toLowerCase().includes(filters.title.toLowerCase()) &&
          !filters.gender) ||
        (movie.gender.toLowerCase().includes(filters.gender.toLowerCase()) &&
          !filters.director) ||
        (movie.director
          .toLowerCase()
          .includes(filters.director.toLowerCase()) &&
          !filters.actors) ||
        filters.actors.some((actor) => movie.actors.includes(actor))
      );
    });
  }

  update(id: string, updateMovieDto: UpdateMovieDto): MovieDto {
    const movieIndex = this.movies.findIndex((movie) => movie.id === id);

    if (movieIndex < 0) {
      throw new HttpException('Movie not found.', HttpStatus.NOT_FOUND);
    }

    const movieUpdated: MovieDto = {
      id: this.movies[movieIndex].id,
      title: updateMovieDto.title
        ? updateMovieDto.title
        : this.movies[movieIndex].title,
      director: updateMovieDto.director
        ? updateMovieDto.director
        : this.movies[movieIndex].director,
      gender: updateMovieDto.gender
        ? updateMovieDto.gender
        : this.movies[movieIndex].gender,
      actors: updateMovieDto.actors
        ? updateMovieDto.actors
        : this.movies[movieIndex].actors,
      rating: this.movies[movieIndex].rating,
    };

    this.movies.splice(movieIndex, 1, movieUpdated);

    return movieUpdated;
  }
}
