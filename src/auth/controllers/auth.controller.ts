import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/user/decoradors';
import { UserType } from 'src/user/types';
import { AuthDto } from '../dto';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() currentUser: UserType) {
    return this.authService.login(currentUser);
  }

  @Post('register')
  register(@Body() dto: AuthDto): Promise<User> {
    return this.authService.register(dto);
  }
}
