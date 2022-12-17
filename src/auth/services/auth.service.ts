import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { UserType } from 'src/user/types';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import exclude from 'src/utils/exclude';
import { AuthDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserType> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await comparePassword(password, user.password))) {
      return exclude(user, ['password']);
    }
    return null;
  }

  async login(user: UserType) {
    return {
      accessToken: this.jwtService.sign(
        { payload: user },
        { expiresIn: '60s' },
      ),
    };
  }

  async register(dto: AuthDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await encodePassword(dto.password),
        name: dto.name,
      },
    });
    return newUser;
  }
}
