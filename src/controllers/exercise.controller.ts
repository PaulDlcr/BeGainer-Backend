import { Request, Response } from 'express';
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseDto, UpdateExerciseDto } from '../dto/exercise.dto';

export class ExerciseController {
  private exerciseService = new ExerciseService();

  async create(req: Request, res: Response) {
    try {
      const createExerciseDto: CreateExerciseDto = req.body;
      const exercise = await this.exerciseService.create(createExerciseDto);
      res.status(201).json(exercise);
    } catch (error) {
      res.status(400).json({ message: 'Error creating exercise' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const exercises = await this.exerciseService.findAll();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exercises' });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const exercise = await this.exerciseService.findOne(req.params.id);
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exercise' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateExerciseDto: UpdateExerciseDto = req.body;
      const exercise = await this.exerciseService.update(req.params.id, updateExerciseDto);
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      res.json(exercise);
    } catch (error) {
      res.status(400).json({ message: 'Error updating exercise' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const success = await this.exerciseService.remove(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting exercise' });
    }
  }

  async findByMuscleGroup(req: Request, res: Response) {
    try {
      const exercises = await this.exerciseService.findByMuscleGroup(req.params.muscleGroup);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exercises by muscle group' });
    }
  }

  async findByDifficulty(req: Request, res: Response) {
    try {
      const exercises = await this.exerciseService.findByDifficulty(req.params.difficulty);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exercises by difficulty' });
    }
  }
} 