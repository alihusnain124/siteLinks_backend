import { body, param, query, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(
      res,
      400,
      'Validation failed',
      errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    );
  }

  next();
};

export const authValidators = {
  signup: [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 50 })
      .withMessage('Username must be between 3 and 50 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),

    body('role')
      .optional()
      .isIn(['admin', 'user'])
      .withMessage('Role must be either admin or user'),

    handleValidationErrors,
  ],

  login: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('password').notEmpty().withMessage('Password is required'),

    body('role').isIn(['admin', 'user']).withMessage('Role must be either admin or user'),

    handleValidationErrors,
  ],
};

export const siteValidators = {
  create: [
    body('siteUrl')
      .trim()
      .notEmpty()
      .withMessage('Site URL is required')
      .isURL()
      .withMessage('Must be a valid URL'),

    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be between 1 and 200 characters'),

    body('description').trim().notEmpty().withMessage('Description is required'),

    body('coverImage').optional().trim().isURL().withMessage('Cover image must be a valid URL'),

    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required')
      .isIn([
        'Technology',
        'Design',
        'News',
        'Education',
        'Entertainment',
        'Business',
        'Health',
        'Sports',
        'Science',
        'Other',
      ])
      .withMessage('Invalid category'),

    handleValidationErrors,
  ],

  update: [
    param('id').isUUID().withMessage('Invalid site ID (must be a valid UUID)'),

    body('siteUrl').optional().trim().isURL().withMessage('Must be a valid URL'),

    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be between 1 and 200 characters'),

    body('coverImage').optional().trim().isURL().withMessage('Cover image must be a valid URL'),

    body('description')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters'),

    body('category')
      .optional()
      .trim()
      .isIn([
        'Technology',
        'Design',
        'News',
        'Education',
        'Entertainment',
        'Business',
        'Health',
        'Sports',
        'Science',
        'Other',
      ])
      .withMessage('Invalid category'),

    handleValidationErrors,
  ],

  getById: [param('id').isInt({ min: 1 }).withMessage('Invalid site ID'), handleValidationErrors],

  delete: [param('id').isInt({ min: 1 }).withMessage('Invalid site ID'), handleValidationErrors],

  getAll: [
    query('category')
      .optional()
      .trim()
      .isIn([
        'Technology',
        'Design',
        'News',
        'Education',
        'Entertainment',
        'Business',
        'Health',
        'Sports',
        'Science',
        'Other',
      ])
      .withMessage('Invalid category'),

    query('search').optional().trim(),

    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),

    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),

    handleValidationErrors,
  ],
};
