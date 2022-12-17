import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthDto } from '../dto';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  register(@Body() dto: AuthDto): Promise<User> {
    return this.authService.register(dto);
  }
}
