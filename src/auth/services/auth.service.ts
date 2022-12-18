import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schema';
import { UserService } from 'src/user/services/user.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    return {
      accessToken: this.jwtService.sign({ payload: user }, { expiresIn: '1h' }),
    };
  }
}
