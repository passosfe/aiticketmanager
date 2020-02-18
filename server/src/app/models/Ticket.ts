import {
  IsNotEmpty,
  Length,
  IsEnum,
  IsOptional,
  MinLength,
  IsDate,
  IsUUID,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { Category } from './Category';
import { Comment } from './Comment';
import { Group } from './Group';
import { User } from './User';

export enum TicketPriority {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

export enum TicketStatus {
  UNCATEGORIZED = 'uncategorized',
  CATEGORIZED = 'categorized',
  ASSIGNED = 'assigned',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
  ANSWERED = 'answered',
  DONE = 'done',
}

@Entity('tickets')
export class Ticket extends BaseEntity {
  constructor(ticket: Partial<Ticket>) {
    super();
    Object.assign(this, ticket);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  @Length(5, 255)
  @IsNotEmpty()
  title: string;

  @Column('simple-enum', {
    enum: TicketPriority,
    nullable: false,
    default: TicketPriority.MEDIUM,
  })
  @IsEnum(TicketPriority)
  @IsOptional()
  priority: TicketPriority;

  @Column('simple-enum', {
    enum: TicketStatus,
    nullable: false,
    default: TicketStatus.UNCATEGORIZED,
  })
  @IsEnum(TicketStatus)
  @IsOptional()
  status: TicketStatus;

  @Column('text', { nullable: false })
  @MinLength(10)
  @IsNotEmpty()
  description: string;

  @Column('text', { nullable: true })
  @MinLength(10)
  @IsOptional()
  answer: string;

  @Column('timestamp', { nullable: true })
  @IsDate()
  @IsOptional()
  categorized_at: Date;

  @Column('timestamp', { nullable: true })
  @IsDate()
  @IsOptional()
  assigned_at: Date;

  @Column('timestamp', { nullable: true })
  @IsDate()
  @IsOptional()
  answered_at: Date;

  @Column('timestamp', { nullable: true })
  @IsDate()
  @IsOptional()
  solved_at: Date;

  @OneToMany(() => Comment, comment => comment.ticket)
  comments: Comment[];

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
  category_id: string;

  @ManyToOne(() => Category, category => category.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
  group_id: string;

  @ManyToOne(() => Group, group => group.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column('uuid', { nullable: false })
  @IsUUID()
  @IsNotEmpty()
  requester_id: string;

  @ManyToOne(() => User, requester => requester.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
  support_id: string;

  @ManyToOne(() => User, support => support.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'support_id' })
  support: User;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
