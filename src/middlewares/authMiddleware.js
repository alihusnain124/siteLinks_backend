import authService from '../services/authService.js';
import { ApiError } from '../utils/responseHandler.js';
import { errorResponse } from '../utils/responseHandler.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError(res, 'Token is missing');
    }
    const token = authHeader.split(' ')[1];
    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = authService.verifyToken(token);
      req.user = decoded;
      next();
    }
    throw ApiError(res, 'Token is missing');
  } catch (error) {
    return errorResponse(res, error);
  }
};
