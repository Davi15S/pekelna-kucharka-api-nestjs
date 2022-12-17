import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Authorized } from 'src/auth/decorador';
import { CurrentUser } from '../decoradors';
import { UserResponseDto } from '../dto';
import { UserDocument } from '../schema';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserResponseDto })
  @Authorized()
  @Get()
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return this.userService.findUserById(user._id);
  }
}
