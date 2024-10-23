import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  director: string;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  @IsArray()
  actors: string[];
}

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  director: string;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsString()
  @IsNotEmpty()
  @IsArray()
  actors: string[];
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
