import { Schema, Prop, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string | null;

  @Prop()
  name: string;
}

export const UserModelDefinition = MongooseModule.forFeature([
  { name: User.name, schema: SchemaFactory.createForClass(User) },
]);
