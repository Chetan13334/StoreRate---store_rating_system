import { verifyToken } from '../utils/jwt.js';
import { sendError } from '../utils/response.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const decoded = verifyToken(token);

  if (!decoded) {
    return sendError(res, 401, 'Unauthorized');
  }

  req.user = decoded;
  next();
};
