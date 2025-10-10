import authService from '../services/authService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import { successResponse } from '../utils/responseHandler.js';

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const result = await authService.signup({
    username,
    email,
    password,
    role
  });
  return successResponse(res,201,'User registered successfully',result)
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const result = await authService.login({
    email,
    password,
    role
  });
  return successResponse(res,200,'Login successful',result)
});
