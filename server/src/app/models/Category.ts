import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { Group } from './Group';
import { Ticket } from './Ticket';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  title: string;

  @Column('uuid')
  group_id: string;

  @OneToMany(() => Ticket, ticket => ticket.category)
  tickets: Ticket[];

  @ManyToOne(() => Group, group => group.id)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
