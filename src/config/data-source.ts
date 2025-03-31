import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development', // Set to false in production
  logging: process.env.NODE_ENV === 'development',
  entities: [__dirname + '/../entities/*.js'], // Chargement dynamique en prod
  migrations: [__dirname + '/../migrations/*.js'],
  subscribers: [__dirname + '/../subscribers/*.js'],
  ssl: {
    rejectUnauthorized: false,
  },
}); 