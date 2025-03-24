import { Request } from 'express';
import { User } from '../entities/User';

export interface AuthRequest extends Request {
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 