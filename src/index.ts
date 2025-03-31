import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth.routes';
import exerciseRoutes from './routes/exercise.routes';
import { seedExercises } from './utils/seedDatabase';  // Assure-toi que tu as le bon chemin

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Initialize TypeORM
AppDataSource.initialize()
  .then(async () => {
    console.log('Connected to PostgreSQL');
    
    // Ajouter l'appel à seedExercises pour insérer les exercices statiques si nécessaire
    await seedExercises();

  })
  .catch((error) => console.error('TypeORM connection error:', error));

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to BeGainer Backend API' 
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
