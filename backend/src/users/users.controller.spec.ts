import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleEnum } from '../roles/userRole.interface';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') {
        return 'test_secret';
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return the user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        role: UserRoleEnum.ADMIN,
      };
      const result: UserDto = {
        id: '1',
        ...createUserDto,
        isActive: false,
      };

      mockUsersService.create.mockResolvedValue(result);

      expect(await usersController.create(createUserDto)).toEqual(result);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: UserDto[] = [
        {
          id: '1',
          username: 'testuser',
          password: 'testpassword',
          role: UserRoleEnum.ADMIN,
          isActive: false,
        },
      ];

      mockUsersService.findAll.mockResolvedValue(result);

      expect(await usersController.findAll()).toEqual(result);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result: UserDto = {
        id: '1',
        username: 'testuser',
        password: 'testpassword',
        role: UserRoleEnum.ADMIN,
        isActive: false,
      };

      mockUsersService.findOne.mockResolvedValue(result);

      expect(await usersController.findOne('1')).toEqual(result);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      const result: UserDto = {
        id: '1',
        username: 'updateduser',
        password: 'originalPassword',
        role: UserRoleEnum.USER,
        isActive: true,
      };

      mockUsersService.update.mockResolvedValue(result);

      expect(await usersController.update('1', updateUserDto)).toEqual(result);
      expect(mockUsersService.update).toHaveBeenCalledWith('1', updateUserDto);
    });
  });
});
