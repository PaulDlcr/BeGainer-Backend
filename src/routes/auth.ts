import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = userRepository.create({ email, password: hashedPassword, name });
    await userRepository.save(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (error: unknown) {  // Ici, on spécifie que error est de type 'unknown'
    if (error instanceof Error) {
      console.error('Error during user registration:', error);
      res.status(400).json({ message: 'Error creating user', error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Unexpected error' });
    }
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
    const isMatch = await bcrypt.compare(password, user.password);
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
  } catch (error: unknown) {  // Ici aussi, on spécifie que error est de type 'unknown'
    if (error instanceof Error) {
      console.error('Error during user login:', error);
      res.status(400).json({ message: 'Error logging in', error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
});


export default router;
