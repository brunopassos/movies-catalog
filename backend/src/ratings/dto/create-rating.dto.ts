import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ description: 'Must be an integer from 0 to 4.', example: '2' })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Needs to be the movie id',
    example: '544f78dd-2428-4b12-9c5d-954ac2669eb8',
  })
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @ApiProperty({
    description: 'Needs to be the user id',
    example: '29868cc6-c776-415d-9160-eb5b4fa437d3',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class RatingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Must be an integer from 0 to 4.', example: '4' })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Needs to be the movie id',
    example: '544f78dd-2428-4b12-9c5d-954ac2669eb8',
  })
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @ApiProperty({
    description: 'Needs to be the user id',
    example: '29868cc6-c776-415d-9160-eb5b4fa437d3',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
