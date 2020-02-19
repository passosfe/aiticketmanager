import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

export const createTypeormConn = async (): Promise<Connection> => {
  return createConnection();
};
