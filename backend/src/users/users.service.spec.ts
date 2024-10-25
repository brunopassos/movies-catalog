import { ConflictException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../db/entities/user.entity';
import { UserRoleEnum } from '../roles/userRole.interface';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserEntityRepository', useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository<UserEntity>>(
      'UserEntityRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        role: UserRoleEnum.USER,
      };

      usersRepository.findOne.mockResolvedValue(null);
      const savedUser = { id: uuid(), ...createUserDto, isActive: true };
      usersRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(plainToInstance(UserDto, savedUser));
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { username: createUserDto.username },
      });
      expect(usersRepository.save).toHaveBeenCalledWith(expect.any(UserEntity));
    });

    it('should throw a ConflictException if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'existinguser',
        password: 'testpassword',
        role: UserRoleEnum.USER,
      };

      usersRepository.findOne.mockResolvedValue({ username: 'existinguser' });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { username: createUserDto.username },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 'existing-user-id';
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
        password: 'updatedpassword',
        role: UserRoleEnum.ADMIN,
      };

      const existingUser = {
        id,
        username: 'existinguser',
        password: 'oldpassword',
        role: 'user',
        isActive: true,
      };

      usersRepository.findOne.mockResolvedValue(existingUser);

      const updatedUser = {
        ...existingUser,
        ...updateUserDto,
      };
      usersRepository.update.mockResolvedValue(updatedUser);

      const result = await service.update(id, updateUserDto);

      expect(result).toEqual(plainToInstance(UserDto, updatedUser));
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(usersRepository.update).toHaveBeenCalledWith(
        id,
        expect.any(UserEntity),
      );
    });

    it('should throw HttpException if user not found', async () => {
      const id = 'non-existing-user-id';
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      usersRepository.findOne.mockResolvedValue(null);

      await expect(service.update(id, updateUserDto)).rejects.toThrow(
        HttpException,
      );
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
