import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../common/constants.js';

const router = Router();

router.post('/login', (_, res) => {
  try {
    const token = jwt.sign({ username: 'mock-user' }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
