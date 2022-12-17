import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/dto';
import { encodePassword } from 'src/utils/bcrypt';
import { InjectModel } from 'src/utils/database/inject-model';
import { User } from '../schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly UserModel: Model<User>) {}

  async findByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }

  async createUser(dto: RegisterDto) {
    const newUser = await new this.UserModel({
      ...dto,
      password: await encodePassword(dto.password),
    });
    newUser.save();
    return newUser;
  }

  // async findUserById(id: Types.ObjectId) {}
}
