import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '../roles/userRole.interface';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_EXPIRATION_TIME') {
                return '3600';
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign in successfully with valid credentials', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      password: 'hashedPassword',
      role: UserRoleEnum.ADMIN,
    };

    jest.spyOn(usersService, 'findByUsername').mockResolvedValueOnce(mockUser);

    jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);

    jest.spyOn(jwtService, 'sign').mockReturnValueOnce('fake-jwt-token');

    const result = await service.signIn('testuser', 'correctpassword');

    expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      'correctpassword',
      mockUser.password,
    );
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: mockUser.id,
      username: mockUser.username,
      role: mockUser.role,
    });
    expect(result).toEqual({ token: 'fake-jwt-token', expiresIn: 3600 });
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    jest.spyOn(usersService, 'findByUsername').mockResolvedValueOnce(null);

    await expect(service.signIn('unknownuser', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(usersService.findByUsername).toHaveBeenCalledWith('unknownuser');
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    const mockUser = {
      username: 'testuser',
      password: 'hashedpassword',
    };

    jest.spyOn(usersService, 'findByUsername').mockResolvedValueOnce(mockUser);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(false);

    await expect(service.signIn('testuser', 'wrongpassword')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
  });
});
