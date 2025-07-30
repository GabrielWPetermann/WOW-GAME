import { Router } from 'express';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Placeholder routes - will be implemented with actual controllers
router.get('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Users route working' });
});

router.get('/profile', authenticate, (req, res) => {
  res.json({ success: true, message: 'User profile route working' });
});

export default router;
