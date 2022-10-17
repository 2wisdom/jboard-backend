import { Module } from '@nestjs/common';
import { loadEntity } from '../entities/loadEntity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordProvider } from '../auth/password-provider';

@Module({
  imports: [loadEntity([UserEntity])],
  providers: [UserService, PasswordProvider],
  exports: [loadEntity([UserEntity])],
  controllers: [UserController],
})
export class UserModule {}
