import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateMovieDto, MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<MovieDto> {
    const movieAlreadyExists = await this.moviesRepository.findOne({
      where: { title: createMovieDto.title },
    });

    if (movieAlreadyExists) {
      throw new ConflictException(`Movie already exists.`);
    }

    const dbMovie = new MovieEntity();

    dbMovie.id = uuid();
    dbMovie.title = createMovieDto.title;
    dbMovie.actors = createMovieDto.actors;
    dbMovie.director = createMovieDto.director;
    dbMovie.gender = createMovieDto.gender;

    const { id, title, actors, director, gender } =
      await this.moviesRepository.save(dbMovie);

    return { id, title, actors, director, gender, rating: 0 };
  }

  async findAll(): Promise<MovieDto[]> {
    const movies = await this.moviesRepository.find();
    return plainToInstance(MovieDto, movies);
  }

  async findOne(id: string): Promise<MovieDto> {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new HttpException('Movie not found.', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(MovieDto, movie);
  }

  async findWithFilters(filters: Partial<MovieDto>): Promise<MovieDto[]> {
    const movies = await this.findAll();

    return movies.filter((movie) => {
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

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<MovieDto> {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new HttpException('Movie not found.', HttpStatus.NOT_FOUND);
    }

    const dbMovie = new MovieEntity();

    dbMovie.id = movie.id;
    dbMovie.title = updateMovieDto.title ? updateMovieDto.title : movie.title;
    dbMovie.actors = updateMovieDto.actors
      ? updateMovieDto.actors
      : movie.actors;
    dbMovie.director = updateMovieDto.director
      ? updateMovieDto.director
      : movie.director;
    dbMovie.gender = updateMovieDto.gender
      ? updateMovieDto.gender
      : movie.gender;

    await this.moviesRepository.update(dbMovie.id, dbMovie);

    return plainToInstance(MovieDto, dbMovie);
  }
}
