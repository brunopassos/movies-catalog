import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateRatingDto, RatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  private readonly ratings: RatingDto[] = [];
  create(createRatingDto: CreateRatingDto): RatingDto {
    const ratingAlreadyExists = this.ratings.find(
      (rating) =>
        rating.userId === createRatingDto.userId &&
        rating.movieId === createRatingDto.movieId,
    );

    if (ratingAlreadyExists) {
      throw new HttpException(
        `This user already rating this movie.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRating: RatingDto = {
      id: uuid(),
      ...createRatingDto,
    };

    this.ratings.push(newRating);

    return newRating;
  }

  update(id: string, updateRatingDto: UpdateRatingDto): RatingDto {
    const ratingIndex = this.ratings.findIndex((rating) => rating.id === id);

    if (ratingIndex < 0) {
      throw new HttpException('Rating not found.', HttpStatus.NOT_FOUND);
    }

    const userUpdated: RatingDto = {
      id: this.ratings[ratingIndex].id,
      rating: updateRatingDto.rating
        ? updateRatingDto.rating
        : this.ratings[ratingIndex].rating,
      userId: this.ratings[ratingIndex].userId,
      movieId: this.ratings[ratingIndex].movieId,
    };

    this.ratings.splice(ratingIndex, 1, userUpdated);

    return userUpdated;
  }
}
