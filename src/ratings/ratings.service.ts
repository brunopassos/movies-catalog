import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { MovieEntity } from '../db/entities/movie.entity';
import { RatingEntity } from '../db/entities/rating.entity';
import { UserEntity } from '../db/entities/user.entity';
import { CreateRatingDto, RatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}
  async create(createRatingDto: CreateRatingDto): Promise<RatingDto> {
    const userFound = await this.userRepository.findOne({
      where: { id: createRatingDto.userId },
    });

    const movieFound = await this.movieRepository.findOne({
      where: { id: createRatingDto.movieId },
    });

    const ratingAlreadyExists = await this.ratingsRepository.findOne({
      where: { user: userFound, movie: movieFound },
    });

    if (ratingAlreadyExists) {
      throw new HttpException(
        `This user already rating this movie.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const dbRating = new RatingEntity();

    dbRating.id = uuid();
    dbRating.rating = createRatingDto.rating;
    dbRating.movie = movieFound;
    dbRating.user = userFound;

    const { id, movie, rating, user } =
      await this.ratingsRepository.save(dbRating);

    return plainToInstance(RatingDto, { id, movie, rating, user });
  }

  async update(
    id: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<RatingDto> {
    const rating = await this.ratingsRepository.findOne({
      where: { id },
    });

    if (!rating) {
      throw new HttpException('Rating not found.', HttpStatus.NOT_FOUND);
    }

    const dbRating = new RatingEntity();

    dbRating.id = rating.id;
    dbRating.rating = updateRatingDto.rating
      ? updateRatingDto.rating
      : rating.rating;
    dbRating.movie = rating.movie;
    dbRating.user = rating.user;

    await this.ratingsRepository.update(dbRating.id, dbRating);

    return plainToInstance(RatingDto, dbRating);
  }
}
