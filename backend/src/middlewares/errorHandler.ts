import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  console.error(`Error ${statusCode}: ${message}`);
  console.error(err.stack);

  // Don't expose internal server errors in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: 'Something went wrong on our end',
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }
};

export const createError = (statusCode: number, message: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
