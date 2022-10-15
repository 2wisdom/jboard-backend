import { Module } from '@nestjs/common';
import { loadEntity } from '../entities/loadEntity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [loadEntity([UserEntity])],
  providers: [UserService],
})
export class UserModule {}
