import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ ignoreEnvFile: true }),
        JwtModule.register({ secret: 'test-secret' }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get(AuthService);
  });

  it('returns a token and user for valid demo credentials', () => {
    const result = service.login('admin@wings.io', 'Demo123!');
    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe('admin@wings.io');
    expect(result.user.role).toBe('admin');
  });

  it('rejects invalid credentials', () => {
    expect(() => service.login('admin@wings.io', 'wrong-password')).toThrow(
      UnauthorizedException,
    );
  });
});
