import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  @IsString()
  movieId: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class RatingDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsNumber()
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  @IsString()
  movieId: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
