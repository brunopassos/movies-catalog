import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RatingEntity } from './rating.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'varchar' })
  director: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column('text', { array: true })
  actors: string[];
  @Column('text')
  image_url: string;

  @OneToMany(() => RatingEntity, (rating) => rating.movie, { cascade: true })
  ratings: RatingEntity[];
}
