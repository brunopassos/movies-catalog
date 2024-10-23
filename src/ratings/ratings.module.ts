import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { RatingEntity } from 'src/db/entities/rating.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService],
  imports: [TypeOrmModule.forFeature([RatingEntity, UserEntity, MovieEntity])],
})
export class RatingsModule {}
