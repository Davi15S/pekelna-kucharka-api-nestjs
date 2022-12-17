import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserModelDefinition } from './schema';

@Module({
  imports: [UserModelDefinition],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
