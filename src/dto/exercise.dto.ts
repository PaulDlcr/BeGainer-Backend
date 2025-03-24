export class CreateExerciseDto {
  name: string;
  description?: string;
  type: number;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

export class UpdateExerciseDto {
  name?: string;
  description?: string;
  type?: number;
  muscleGroup?: string;
  equipment?: string;
  difficulty?: string;
} 