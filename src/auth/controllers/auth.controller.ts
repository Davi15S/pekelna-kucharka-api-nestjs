import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { CurrentUser } from 'src/user/decoradors';
import { UserDocument } from 'src/user/schema';
import { UserService } from 'src/user/services/user.service';
import { AuthDto } from '../dto';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() currentUser: UserDocument) {
    return this.authService.login(currentUser);
  }

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.userService.createUser(dto);
  }
}
