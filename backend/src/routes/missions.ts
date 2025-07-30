import { Router } from 'express';
import { authenticate, optionalAuth } from '../middlewares/auth';

const router = Router();

// Placeholder routes - will be implemented with actual controllers
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'Missions route working' });
});

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Create mission route working' });
});

export default router;
