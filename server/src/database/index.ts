import 'reflect-metadata';
import { Category } from '@models/Category';
import { Comment } from '@models/Comment';
import { Group } from '@models/Group';
import { Ticket } from '@models/Ticket';
import { User } from '@models/User';
import { createConnection, Connection } from 'typeorm';

// export const entities = [Group, Category, User, Ticket, Comment];

class Database {
  public connection: Connection;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    this.connection = await createConnection(/* {
      type: 'postgres',
      ...databaseConfig,
      entities,
    } */);
  }
}

export default new Database();
