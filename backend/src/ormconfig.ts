import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Task } from './entities/Task';
import dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'todo',
  synchronize: true, // set to false in production
  logging: false,
  entities: [User, Task],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
}); 