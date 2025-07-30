import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import config from '../config';
import { createError } from '../middlewares/errorHandler';
import { AuthenticatedRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

interface RegisterBody {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, firstName, lastName, password }: RegisterBody = req.body;

    // Validate input
    if (!email || !username || !firstName || !lastName || !password) {
      throw createError(400, 'All fields are required');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      throw createError(409, 'User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        level: true,
        currentXP: true,
        totalXP: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwtRefreshSecret,
      { expiresIn: config.jwtRefreshExpiresIn }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: LoginBody = req.body;

    // Validate input
    if (!email || !password) {
      throw createError(400, 'Email and password are required');
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        character: true,
      },
    });

    if (!user || !user.password) {
      throw createError(401, 'Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError(401, 'Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwtRefreshSecret,
      { expiresIn: config.jwtRefreshExpiresIn }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError(400, 'Refresh token is required');
    }

    const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      throw createError(401, 'Invalid refresh token');
    }

    // Generate new access token
    const newToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      success: true,
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError(401, 'Invalid refresh token'));
    } else {
      next(error);
    }
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        level: true,
        currentXP: true,
        totalXP: true,
        avatar: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        character: true,
      },
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
