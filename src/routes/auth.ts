import express from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = userRepository.create({ email, password, name });
    await userRepository.save(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in' });
  }
});

export default router; 