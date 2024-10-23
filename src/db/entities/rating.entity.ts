import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { UserEntity } from './user.entity';

@Entity('ratings')
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.ratings, {
    onDelete: 'CASCADE',
  })
  movie: MovieEntity;

  @ManyToOne(() => UserEntity, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: UserEntity;
}
