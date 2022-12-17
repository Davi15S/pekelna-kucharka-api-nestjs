import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { AuthDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    return null;
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
