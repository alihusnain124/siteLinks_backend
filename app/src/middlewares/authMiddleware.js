import  authService from '../services/authService.js';
import { errorResponse } from '../utils/responseHandler.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res,401,'Access denied. No token provided.')
    }

    const token = authHeader.split(' ')[1];
    const decoded = authService.verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
   return errorResponse(res,401,'Invaild Token Provided')
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = authService.verifyToken(token);
      req.user = decoded;
    }

    next();
  } catch (error) {
    next();
  }
};
