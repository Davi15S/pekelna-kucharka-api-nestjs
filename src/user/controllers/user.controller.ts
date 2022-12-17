import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser() {
    return 'Ahoj';
  }
}
