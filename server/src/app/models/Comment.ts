import { MinLength, IsNotEmpty, IsUUID } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { Ticket } from './Ticket';
import { User } from './User';

@Entity('comments')
export class Comment extends BaseEntity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  @MinLength(5)
  @IsNotEmpty()
  comment: string;

  @Column('uuid', { nullable: false })
  @IsUUID()
  @IsNotEmpty()
  ticket_id: string;

  @ManyToOne(() => Ticket, ticket => ticket.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @Column('uuid', { nullable: false })
  @IsUUID()
  @IsNotEmpty()
  author_id: string;

  @ManyToOne(() => User, user => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
