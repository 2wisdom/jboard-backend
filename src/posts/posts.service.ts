import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  manage(post: PostEntity) {
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

    builder.orderBy('post.created_at', 'DESC');
    return paginate<PostEntity>(builder, options);
  }
}
