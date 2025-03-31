import { AppDataSource } from '../config/data-source';
import { Exercise } from '../entities/Exercise';
import { CreateExerciseDto, UpdateExerciseDto } from '../dto/exercise.dto';

export class ExerciseService {
  private exerciseRepository = AppDataSource.getRepository(Exercise);

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(createExerciseDto);
    return await this.exerciseRepository.save(exercise);
  }

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseRepository.find();
  }

  async findOne(id: string): Promise<Exercise | null> {
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise | null> {
    const exercise = await this.findOne(id);
    if (!exercise) return null;

    Object.assign(exercise, updateExerciseDto);
    return await this.exerciseRepository.save(exercise);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.exerciseRepository.delete(id);
    return result.affected ? true : false;
  }

  async findByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    return await this.exerciseRepository.find({ where: { muscleGroup } });
  }

  async findByDifficulty(difficulty: string): Promise<Exercise[]> {
    return await this.exerciseRepository.find({ where: { difficulty } });
  }
} 