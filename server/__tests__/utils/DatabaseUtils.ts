// import { entities } from '@database/index';
import { Connection, createConnection, EntityMetadata } from 'typeorm';

class DatabaseUtils {
  public connection: Connection;

  public entities: EntityMetadata[];

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    this.connection = await createConnection();
    this.entities = this.connection.entityMetadatas;
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

export default new DatabaseUtils();
