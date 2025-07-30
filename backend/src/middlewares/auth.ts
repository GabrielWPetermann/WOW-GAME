import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import config from '../config';
import { createError } from './errorHandler';

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError(401, 'Access token required');
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      username: string;
    };

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      throw createError(401, 'User not found');
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      username: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
    }

    next();
  } catch (error) {
    // Ignore auth errors for optional auth
    next();
  }
};
