import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRoleEnum } from 'src/roles/userRole.interface';
import { CreateMovieDto, MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<MovieDto> {
    return await this.moviesService.create(createMovieDto);
  }

  @Get('filter')
  async findWithFilters(
    @Query('title') title?: string,
    @Query('director') director?: string,
    @Query('gender') gender?: string,
    @Query('actors') actors?: string[],
  ): Promise<MovieDto[]> {
    const filters: Partial<MovieDto> = {
      title,
      director,
      gender,
      actors: Array.isArray(actors) ? actors : actors ? [actors] : [],
    };

    return await this.moviesService.findWithFilters(filters);
  }

  @Get()
  async findAll(): Promise<MovieDto[]> {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieDto> {
    return await this.moviesService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<MovieDto> {
    return await this.moviesService.update(id, updateMovieDto);
  }
}
