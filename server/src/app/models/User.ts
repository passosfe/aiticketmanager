import bcrypt from 'bcryptjs';
import {
  Length,
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
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
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  @Length(5, 255)
  @IsNotEmpty()
  name: string;

  @Column('varchar', { length: 254, nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @Column('varchar', { length: 60, nullable: false })
  password_hash: string;

  @Column('boolean', { default: false })
  @IsBoolean()
  @IsOptional()
  is_admin: boolean;

  @Column('timestamp', { nullable: true })
  @IsOptional()
  @IsDate()
  last_login: Date;

  @Column('timestamp', { nullable: true })
  @IsOptional()
  @IsDate()
  deprovisioned_at: Date;

  @Column('varchar', { length: 255, nullable: true })
  @IsOptional()
  token: string;

  @Column('timestamp', { nullable: true })
  @IsOptional()
  @IsDate()
  token_created_at: Date;

  @OneToMany(() => Ticket, ticket => ticket.requester)
  requester_tickets: Ticket[];

  @OneToMany(() => Ticket, ticket => ticket.support)
  support_tickets: Ticket[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @Column('uuid', { nullable: false })
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

  @BeforeInsert()
  @BeforeUpdate()
  async hash(): Promise<void> {
    if (this.password) {
      this.password_hash = await bcrypt.hash(this.password, 8);
      this.password = '';
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }
}
