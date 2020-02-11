import 'dotenv/config';

export default {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/app/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};
