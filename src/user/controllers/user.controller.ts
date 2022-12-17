import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { CurrentUser } from '../decoradors';
import { UserDocument } from '../schema';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return this.userService.findUserById(user._id);
  }
}
