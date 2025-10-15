import authService from '../services/authService.js';
import { errorResponse } from '../utils/responseHandler.js';
import { successResponse } from '../utils/responseHandler.js';

export const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    return successResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    return errorResponse(res, error);
  }
};
