import { IsEmail, MinLength, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @IsString()
  password: string;

  @IsString()
  name: string;
}
