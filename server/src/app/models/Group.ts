import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { Category } from './Category';
import { Ticket } from './Ticket';
import { User } from './User';

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  title: string;

  @OneToMany(() => Category, category => category.group)
  categories: Category[];

  @OneToMany(() => User, user => user.group)
  users: User[];

  @OneToMany(() => Ticket, ticket => ticket.group)
  tickets: Ticket[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
