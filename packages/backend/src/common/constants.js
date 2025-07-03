/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/rlma_db';

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
