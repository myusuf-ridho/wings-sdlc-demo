import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Validates credentials against the demo user from environment variables.
   * (US-1 Login — see docs/prd.md)
   */
  validateUser(email: string, password: string): DemoUser {
    const demoEmail = this.config.get<string>(
      'DEMO_USER_EMAIL',
      'admin@wings.io',
    );
    const demoPassword = this.config.get<string>(
      'DEMO_USER_PASSWORD',
      'Demo123!',
    );

    if (email !== demoEmail || password !== demoPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: 'demo-user-1',
      email: demoEmail,
      name: 'Demo Admin',
      role: 'admin',
    };
  }

  login(email: string, password: string) {
    const user = this.validateUser(email, password);
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { accessToken, user };
  }
}
