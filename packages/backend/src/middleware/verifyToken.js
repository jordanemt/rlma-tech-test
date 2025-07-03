import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../common/constants.js';

function verifyToken(req, res, next) {
  const header = req.header('Authorization') || '';
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.username = payload.username;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Token not valid' });
  }
}

export default verifyToken;
