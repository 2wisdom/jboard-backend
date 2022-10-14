import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'tbl_posts',
})
export class PostEntity extends BaseEntity {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '제목' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ description: '내용' })
  @Column({ nullable: false, type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  @ApiProperty({ description: '작성자 아이디' })
  @Column({ comment: '작성자 id' })
  author_id: string;
}
