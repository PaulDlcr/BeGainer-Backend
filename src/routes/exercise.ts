import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Exercise } from '../entities/Exercise';
import { validate as isUUID } from 'uuid';  // ✅ Import de la validation UUID

const router = Router();
const exerciseRepository = AppDataSource.getRepository(Exercise);

// 📌 Récupérer tous les exercices
router.get('/', async (req, res) => {
  try {
    const exercises = await exerciseRepository.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des exercices' });
  }
});

// 📌 Récupérer un exercice par ID (avec validation UUID)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ message: 'ID invalide, doit être un UUID' });
    }

    const exercise = await exerciseRepository.findOne({ where: { id } });

    if (!exercise) {
      return res.status(404).json({ message: 'Exercice non trouvé' });
    }

    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'exercice' });
  }
});

export default router;
