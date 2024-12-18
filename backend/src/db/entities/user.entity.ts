import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../../roles/userRole.interface';
import { RatingEntity } from './rating.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
  })
  role: UserRoleEnum;

  @OneToMany(() => RatingEntity, (rating) => rating.user, { cascade: true })
  ratings: RatingEntity[];

  @Column({ type: 'boolean', name: 'isactive' })
  isActive: boolean;
}
