import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

let User: any, Exercise: any;

if (process.env.NODE_ENV === 'development') {
  User = require('../entities/User').User;
  Exercise = require('../entities/Exercise').Exercise;
} else {
  User = require('../dist/entities/User').User;
  Exercise = require('../dist/entities/Exercise').Exercise;
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Exercise],  // Utilise User et Exercise après la logique conditionnelle
  migrations: process.env.NODE_ENV === 'development' ? ['src/migrations/*.ts'] : ['dist/migrations/*.js'],
  subscribers: process.env.NODE_ENV === 'development' ? ['src/subscribers/*.ts'] : ['dist/subscribers/*.js'],
  ssl: {
    rejectUnauthorized: false,
  },
});
