import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Ticket } from './Ticket';
import { User } from './User';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  comment: string;

  @Column('uuid')
  ticket_id: string;

  @ManyToOne(() => Ticket, ticket => ticket.id)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @Column('uuid')
  author_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
