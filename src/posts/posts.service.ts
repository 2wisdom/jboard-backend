import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async manage(post: PostEntity) {
    const auhtor = await this.userRepository.findOne({
      where: {
        id: post.author_id,
      },
    });

    if (!auhtor) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `author_id not found`,
      });
    }

    post.author = auhtor;
    return this.postRepository.save(post);
  }

  findOne(id: PostEntity['id']) {
    return this.postRepository.findOneByOrFail({ id });
  }

  delete(id: PostEntity['id']) {
    return this.postRepository.delete(id);
  }

  findAll(options: IPaginationOptions) {
    const builder = this.postRepository.createQueryBuilder('post');

    builder.leftJoinAndSelect('post.author', 'author');
    builder.orderBy('post.created_at', 'DESC');
    return paginate<PostEntity>(builder, {
      ...options,
    });
  }
}
