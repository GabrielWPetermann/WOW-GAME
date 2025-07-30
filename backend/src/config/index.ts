import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/wowgame',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  
  // Email
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  emailUser: process.env.EMAIL_USER || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
  emailFrom: process.env.EMAIL_FROM || 'noreply@wowgame.com',
  
  // OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  
  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // File uploads
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
  
  // Rate limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'), // limit each IP to 100 requests per windowMs
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  
  // Bcrypt
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
};

export default config;
