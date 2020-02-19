import { Connection, EntityMetadata } from 'typeorm';

import { createTypeormConn } from '../../src/database';

class TestUtils {
  public connection: Connection;

  public entities: EntityMetadata[];

  async connect(): Promise<void> {
    this.connection = await createTypeormConn();
    this.entities = this.connection.entityMetadatas;
  }

  async disconnect(): Promise<void> {
    await this.connection.close();
    this.entities = [];
  }

  truncate(): Promise<void[]> {
    return Promise.all(
      this.entities.map(entity => {
        return this.connection
          .getRepository(entity.name)
          .query(`TRUNCATE TABLE ${entity.tableName} CASCADE;`);
      }),
    );
  }
}

export default new TestUtils();
