class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map((e) => e.message);
    error.message = messages.join(', ');
    error.statusCode = 400;
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0].path;
    error.message = `${field} already exists`;
    error.statusCode = 400;
  }

  if (err.name === 'SequelizeDatabaseError') {
    error.message = 'Database error occurred';
    error.statusCode = 500;
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error.message = 'Invalid reference to related data';
    error.statusCode = 400;
  }

  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token has expired';
    error.statusCode = 401;
  }

  if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    error.statusCode = 400;
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { AppError, errorHandler, notFoundHandler, asyncHandler };
