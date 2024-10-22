import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto, MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get('filter')
  findWithFilters(
    @Query('title') title?: string,
    @Query('director') director?: string,
    @Query('gender') gender?: string,
    @Query('actors') actors?: string[],
  ): MovieDto[] {
    const filters: Partial<MovieDto> = {
      title,
      director,
      gender,
      actors: Array.isArray(actors) ? actors : actors ? [actors] : [],
    };

    return this.moviesService.findWithFilters(filters);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }
}
