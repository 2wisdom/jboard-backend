import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';

@Entity({
  name: 'tbl_users',
})
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ comment: 'idp' })
  provider: string;

  @Column({ comment: 'idp 계정 아이디' })
  providerAccountId: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  @BeforeInsert()
  beforeInsert() {
    this.id = nanoid();
  }
}
