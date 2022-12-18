import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserDocument } from 'src/user/schema';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3333/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<UserDocument> {
    const { displayName, emails, username } = profile;
    const email = emails[0].value;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return this.userService.createUser({
        email,
        name: username ?? displayName,
      });
    }
    return user;
  }
}
