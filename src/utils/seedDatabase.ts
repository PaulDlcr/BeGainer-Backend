import { AppDataSource } from '../config/data-source'; // Assure-toi que le chemin vers data-source est correct
import { Exercise } from '../entities/Exercise';

const exercises = [
  { name: "Squat", description: "Exercice pour les jambes", type: 1, muscleGroup: "lower body", equipment: "barbell", difficulty: "medium" },
  { name: "Bench Press", description: "Exercice pour la poitrine", type: 1, muscleGroup: "upper body", equipment: "barbell", difficulty: "medium" },
  { name: "Pull-up", description: "Exercice pour le dos", type: 2, muscleGroup: "upper body", equipment: "bodyweight", difficulty: "difficult" },
  // Ajoute plus d'exercices si nécessaire
];

export const seedExercises = async () => {
  try {
    const exerciseRepository = AppDataSource.getRepository(Exercise);

    // Vérifier si les exercices sont déjà dans la base
    const existingExercises = await exerciseRepository.find();
    if (existingExercises.length > 0) {
      console.log('Les exercices sont déjà insérés');
      return;
    }

    // Insérer les exercices en dur dans la base
    await exerciseRepository.save(exercises);
    console.log('Exercices statiques insérés avec succès');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

// Lancer l'initialisation
seedExercises().catch((error) => console.log(error));
