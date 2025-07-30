import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

import config from './config';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import missionRoutes from './routes/missions';
import characterRoutes from './routes/characters';
import levelRoutes from './routes/levels';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

// Create Express app
const app = express();

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/levels', levelRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`📱 Frontend URL: ${config.frontendUrl}`);
});

export default app;
