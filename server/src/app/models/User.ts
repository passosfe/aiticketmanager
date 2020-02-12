import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

import { Comment } from './Comment';
import { Group } from './Group';
import { Ticket } from './Ticket';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 254, nullable: false, unique: true })
  email: string;

  password: string;

  @Column('varchar', { length: 60, nullable: false })
  password_hash: string;

  @Column('boolean', { default: false })
  is_admin: boolean;

  @Column('timestamp')
  last_login: Date;

  @Column('timestamp')
  deprovisioned_at: Date;

  @Column('varchar', { length: 255 })
  token: string;

  @Column('timestamp')
  token_created_at: Date;

  @OneToMany(() => Ticket, ticket => ticket.requester)
  requester_tickets: Ticket[];

  @OneToMany(() => Ticket, ticket => ticket.support)
  support_tickets: Ticket[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @Column('uuid')
  group_id: string;

  @ManyToOne(() => Group, group => group.id)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hash(): Promise<void> {
    if (this.password) {
      this.password_hash = await bcrypt.hash(this.password, 8);
      this.password = '';
    }
  }

  checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }
}
