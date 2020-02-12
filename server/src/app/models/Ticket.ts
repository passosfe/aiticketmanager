import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Category } from './Category';
import { Comment } from './Comment';
import { Group } from './Group';
import { User } from './User';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('int', { nullable: false })
  priority: number;

  @Column('varchar', { length: 50, nullable: false })
  status: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text')
  answer: string;

  @Column('timestamp')
  categorized_at: Date;

  @Column('timestamp')
  assigned_at: Date;

  @Column('timestamp')
  answered_at: Date;

  @Column('timestamp')
  solved_at: Date;

  @OneToOne(() => Comment, comment => comment.ticket)
  comments: Comment[];

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category[];

  @Column('uuid')
  group_id: string;

  @ManyToOne(() => Group, group => group.id)
  @JoinColumn({ name: 'group_id' })
  group: Group[];

  @Column('uuid')
  requester_id: string;

  @ManyToOne(() => User, requester => requester.id)
  @JoinColumn({ name: 'requester_id' })
  requester: User[];

  @Column('uuid')
  support_id: string;

  @ManyToOne(() => User, support => support.id)
  @JoinColumn({ name: 'support_id' })
  support: User[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
