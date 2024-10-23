import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(createUserDto: CreateUserDto): UserDto {
    const userAlreadyExists = this.users.find(
      (user) => user.username === createUserDto.username,
    );

    if (userAlreadyExists) {
      throw new HttpException(`User already exists.`, HttpStatus.BAD_REQUEST);
    }

    const newUser: UserDto = {
      id: uuid(),
      ...createUserDto,
      password: bcryptHashSync(createUserDto.password, 10),
      isActive: true,
    };

    this.users.push(newUser);

    return plainToInstance(UserDto, newUser);
  }

  findAll(): UserDto[] {
    return plainToInstance(UserDto, this.users);
  }

  findOne(id: string): UserDto {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(UserDto, user);
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }

  update(id: string, updateUserDto: UpdateUserDto): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const userUpdated: UserDto = {
      id: this.users[userIndex].id,
      username: updateUserDto.username
        ? updateUserDto.username
        : this.users[userIndex].username,
      password: updateUserDto.password
        ? updateUserDto.password
        : bcryptHashSync(this.users[userIndex].password, 10),
      role: updateUserDto.role
        ? updateUserDto.role
        : this.users[userIndex].role,
      isActive: updateUserDto.isActive
        ? updateUserDto.isActive
        : this.users[userIndex].isActive,
    };

    this.users.splice(userIndex, 1, userUpdated);

    return plainToInstance(UserDto, userUpdated);
  }

  remove(id: string): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const userInactive: UserDto = {
      ...this.users[userIndex],
      isActive: false,
    };

    this.users.splice(userIndex, 1, userInactive);

    return plainToInstance(UserDto, userInactive);
  }
}
