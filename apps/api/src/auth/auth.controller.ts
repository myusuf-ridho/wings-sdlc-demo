import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  /** US-1: exchange credentials for a JWT. */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  /**
   * US-3: logout. JWT is stateless, so the client discards the token;
   * this endpoint exists for API completeness and audit hooks.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  logout() {
    return {
      success: true,
      message: 'Logged out. Discard the token on the client.',
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@CurrentUser() user: unknown) {
    return { user };
  }
}
