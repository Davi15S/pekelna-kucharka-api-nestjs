import { Injectable } from '@nestjs/common';
import { Model, PipelineStage, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/dto';
import { encodePassword } from 'src/utils/bcrypt';
import { InjectModel } from 'src/utils/database/inject-model';
import { User, UserDocument } from '../schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly UserModel: Model<User>) {}

  async find(
    prePipeline: PipelineStage[] = [],
    postPipeline: PipelineStage[] = [],
  ) {
    return this.UserModel.aggregate<UserDocument>([
      ...prePipeline,
      {
        $project: {
          password: 0,
        },
      },
      ...postPipeline,
    ]);
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }

  async createUser(dto: Partial<RegisterDto>): Promise<UserDocument> {
    if (dto.password) dto.password = await encodePassword(dto.password);

    const newUser = new this.UserModel({ ...dto });
    return newUser.save();
  }

  async findUserByEmail(email: string) {
    return this.UserModel.findOne({ email });
  }

  async findUserById(id: string | Types.ObjectId) {
    const [user] = await this.find([
      { $match: { _id: new Types.ObjectId(id) } },
    ]);
    return user;
  }
}
