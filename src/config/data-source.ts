import { DataSource } from 'typeorm';
import { User } from '../entities/User';  // Importation statique
import { Exercise } from '../entities/Exercise';  // Importation statique
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
  // Logique conditionnelle ici
  entities: process.env.NODE_ENV === 'development'
    ? [User, Exercise] // Développement : utiliser les entités .ts
    : [require('../dist/entities/User').User, require('../dist/entities/Exercise').Exercise], // Production : utiliser les entités compilées .js
  migrations: process.env.NODE_ENV === 'development' ? ['src/migrations/*.ts'] : ['dist/migrations/*.js'],
  subscribers: process.env.NODE_ENV === 'development' ? ['src/subscribers/*.ts'] : ['dist/subscribers/*.js'],
  ssl: {
    rejectUnauthorized: false,
  },
});
