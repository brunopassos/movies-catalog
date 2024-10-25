import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockJwtService: Partial<JwtService>;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    mockJwtService = {
      verifyAsync: jest.fn(),
    };

    mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    };

    authGuard = new AuthGuard(
      mockJwtService as JwtService,
      mockConfigService as ConfigService,
    );
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    let mockRequest: Partial<Request>;
    let mockExecutionContext: Partial<ExecutionContext>;

    beforeEach(() => {
      mockRequest = {
        headers: {
          authorization: 'Bearer valid.token',
        },
      } as Partial<Request>;

      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: () => mockRequest,
        }),
      };
    });

    it('should throw UnauthorizedException if token is not provided', async () => {
      mockRequest.headers.authorization = undefined;

      await expect(
        authGuard.canActivate(mockExecutionContext as ExecutionContext),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      mockJwtService.verifyAsync = jest
        .fn()
        .mockRejectedValue(new Error('invalid token'));

      await expect(
        authGuard.canActivate(mockExecutionContext as ExecutionContext),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should call verifyAsync and return true if token is valid', async () => {
      const mockPayload = { userId: '1', username: 'testuser' };
      mockJwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);

      const result = await authGuard.canActivate(
        mockExecutionContext as ExecutionContext,
      );

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('valid.token', {
        secret: 'test-secret',
      });
      expect(mockRequest['user']).toEqual(mockPayload);
      expect(result).toBe(true);
    });
  });
});
