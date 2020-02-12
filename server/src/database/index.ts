import { createConnection, Connection } from 'typeorm';
import 'reflect-metadata';

import databaseConfig from '@config/database';

const entities = [];

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
