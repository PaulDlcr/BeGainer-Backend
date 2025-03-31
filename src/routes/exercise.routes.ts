import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();
const exerciseController = new ExerciseController();

// All routes are protected with auth middleware
router.use(auth);

// CRUD routes
router.post('/', exerciseController.create.bind(exerciseController));
router.get('/', exerciseController.findAll.bind(exerciseController));
router.get('/:id', exerciseController.findOne.bind(exerciseController));
router.put('/:id', exerciseController.update.bind(exerciseController));
router.delete('/:id', exerciseController.remove.bind(exerciseController));

// Additional routes
router.get('/muscle-group/:muscleGroup', exerciseController.findByMuscleGroup.bind(exerciseController));
router.get('/difficulty/:difficulty', exerciseController.findByDifficulty.bind(exerciseController));

export default router; 