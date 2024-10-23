import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
})
export class MoviesModule {}
