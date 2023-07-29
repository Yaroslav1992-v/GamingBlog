import { Types } from 'mongoose';

export const ALREADY_REGISTERED_ERROR = 'User already exists';
export const WRONG_DATA = 'Wrong email or password';
export interface AuthUser {
  user: { id: Types.ObjectId; iat: number; exp: number };
}
