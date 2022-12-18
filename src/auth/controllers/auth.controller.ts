import { Controller, Post, Body, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist';
import { CurrentUser } from 'src/user/decoradors';
import { UserDocument } from 'src/user/schema';
import { UserService } from 'src/user/services/user.service';
import { LoginDto, LoginResponseDto, RegisterDto } from '../dto';
import { GoogleAuthGuard, LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@CurrentUser() user: UserDocument) {
    const token = await this.authService.login(user);
  }
}
