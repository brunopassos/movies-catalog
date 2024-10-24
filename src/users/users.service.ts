import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../db/entities/user.entity';
import { CreateUserDto, UserDto, UserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userAlreadyExists) {
      throw new ConflictException(`User already exists.`);
    }

    const dbUser = new UserEntity();

    dbUser.id = uuid();
    dbUser.username = createUserDto.username;
    dbUser.password = bcryptHashSync(createUserDto.password, 10);
    dbUser.role = createUserDto.role;

    const { id, username, role, isActive, password } =
      await this.usersRepository.save(dbUser);

    return plainToInstance(UserDto, { id, username, role, isActive, password });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();

    return plainToInstance(UserDto, users);
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(UserDto, user);
  }

  async findByUsername(username: string): Promise<UserLoginDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      role: userFound.role,
      password: userFound.password,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const dbUser = new UserEntity();

    dbUser.id = user.id;
    dbUser.username = updateUserDto.username
      ? updateUserDto.username
      : user.username;
    dbUser.password = updateUserDto.password
      ? bcryptHashSync(updateUserDto.password, 10)
      : user.password;
    dbUser.role = updateUserDto.role ? updateUserDto.role : user.role;
    dbUser.isActive = user.isActive;
    dbUser.ratings = dbUser.ratings;

    await this.usersRepository.update(dbUser.id, dbUser);

    return plainToInstance(UserDto, dbUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(id);
  }
}
