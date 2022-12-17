import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist';
import { CurrentUser } from 'src/user/decoradors';
import { UserDocument } from 'src/user/schema';
import { UserService } from 'src/user/services/user.service';
import { LoginDto, LoginResponseDto, RegisterDto } from '../dto';
import { LocalAuthGuard } from '../guards';
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
  login(@Body() dto: LoginDto, @CurrentUser() currentUser: UserDocument) {
    return this.authService.login(currentUser);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.createUser(dto);
  }
}
