import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async save(user: Partial<UserEntity>) {
    return this.repository.save(user);
  }

  findOne(id: UserEntity['id']) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  findByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }
}
