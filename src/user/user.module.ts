import { Module } from '@nestjs/common';
import { loadEntity } from '../entities/loadEntity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [loadEntity([UserEntity])],
  providers: [UserService],
  exports: [loadEntity([UserEntity])],
  controllers: [UserController],
})
export class UserModule {}
