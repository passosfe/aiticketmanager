import { Length, IsNotEmpty } from 'class-validator';
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
  constructor(group: Partial<Group>) {
    super();
    Object.assign(this, group);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: false, unique: true })
  @Length(5, 100)
  @IsNotEmpty()
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
