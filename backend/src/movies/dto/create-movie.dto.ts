import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'The Lord of The Rings: The Fellowship of the Ring',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Peter Jackson',
  })
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    example: 'Fantasia',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: '["Elijah Wood ", "Ian McKellen", "Sean Astin"]',
  })
  @IsNotEmpty()
  @IsArray()
  actors: string[];
  @ApiProperty({
    example:
      'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'The Lord of The Rings: The Return of the King',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Peter Jackson',
  })
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    example: 'Fantasia',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: '["Elijah Wood ", "Ian McKellen", "Sean Astin"]',
  })
  @IsString()
  @IsNotEmpty()
  @IsArray()
  actors: string[];
  @ApiProperty({
    example:
      'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
