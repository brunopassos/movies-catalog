import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [UsersModule, MoviesModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
