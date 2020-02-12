import { Length, IsNotEmpty, IsUUID } from 'class-validator';
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
  constructor(category: Partial<Category>) {
    super();
    Object.assign(this, category);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: false, unique: true })
  @Length(5, 100)
  @IsNotEmpty()
  title: string;

  @OneToMany(() => Ticket, ticket => ticket.category)
  tickets: Ticket[];

  @Column('uuid')
  @IsUUID()
  @IsNotEmpty()
  group_id: string;

  @ManyToOne(() => Group, group => group.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
