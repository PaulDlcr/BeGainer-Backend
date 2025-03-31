import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../types';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string, name: string): Promise<ApiResponse> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists'
        };
      }

      const user = this.userRepository.create({ email, password, name });
      await this.userRepository.save(user);

      const token = this.generateToken(user);

      return {
        success: true,
        data: { user, token }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error creating user'
      };
    }
  }

  async login(email: string, password: string): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      const token = this.generateToken(user);

      return {
        success: true,
        data: { user, token }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error logging in'
      };
    }
  }

  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }
} 