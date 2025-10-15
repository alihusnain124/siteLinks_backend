import { ApiError } from '../utils/responseHandler.js';
import { errorResponse } from '../utils/responseHandler.js';

export const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) throw ApiError(res, 'Authentication required');
      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      if (!allowedRoles.includes(req.user.role))
        throw ApiError(res, 'Access denied. Insufficient permissions.');

      next();
    } catch (error) {
      return errorResponse(res, error);
    }
  };
};

export const isAdmin = checkRole('admin');

export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, 401, 'Authentication required');
  }
  next();
};
