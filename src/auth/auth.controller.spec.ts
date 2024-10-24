import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AuthService.signIn with correct parameters', async () => {
    const signInSpy = jest.spyOn(authService, 'signIn').mockResolvedValueOnce({
      token: 'fake-jwt-token',
      expiresIn: 3600,
    } as AuthResponseDto);

    const result = await controller.signIn('testuser', 'testpassword');

    expect(signInSpy).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(result).toEqual({ token: 'fake-jwt-token', expiresIn: 3600 });
  });

  it('should handle errors in signIn', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValueOnce(new Error('Unauthorized'));

    await expect(
      controller.signIn('testuser', 'wrongpassword'),
    ).rejects.toThrow('Unauthorized');
  });
});
