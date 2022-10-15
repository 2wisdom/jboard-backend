import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  save(user: UserEntity) {
    return this.repository.save(user);
  }

  findOne(id: UserEntity['id']) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
