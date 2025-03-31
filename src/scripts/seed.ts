import { AppDataSource } from '../config/data-source';
import { Exercise } from '../entities/Exercise';

const insertStaticExercises = async () => {
  await AppDataSource.initialize(); // S'assurer que la DB est connectée

  const exerciseRepository = AppDataSource.getRepository(Exercise);

  // Vérifie si la table est déjà remplie
  const count = await exerciseRepository.count();
  if (count > 0) {
    console.log('🔹 Les exercices existent déjà.');
    return;
  }

  console.log('📌 Insertion des exercices par défaut...');

  const exercises = [
    { name: 'Développé couché', description: 'Travaille la poitrine', type: 1, muscleGroup: 'Poitrine', equipment: 'Barre', difficulty: 'Moyen' },
    { name: 'Squat', description: 'Exercice polyarticulaire pour les jambes', type: 2, muscleGroup: 'Jambes', equipment: 'Barre', difficulty: 'Difficile' },
    { name: 'Curl biceps', description: 'Exercice d’isolation pour les biceps', type: 3, muscleGroup: 'Bras', equipment: 'Haltères', difficulty: 'Facile' },
    { name: 'Tractions', description: 'Exercice au poids du corps pour le dos', type: 4, muscleGroup: 'Dos', equipment: 'Aucune', difficulty: 'Difficile' },
    { name: 'Dips', description: 'Exercice au poids du corps pour les triceps', type: 5, muscleGroup: 'Triceps', equipment: 'Barres parallèles', difficulty: 'Moyen' },
  ];

  await exerciseRepository.save(exercises);
  console.log('✅ Exercices insérés avec succès.');
};

insertStaticExercises().then(() => process.exit()).catch(err => console.error('❌ Erreur:', err));
