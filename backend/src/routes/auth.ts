import { Router } from 'express';
import { register, login, logout, refreshToken, getProfile } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);

export default router;
