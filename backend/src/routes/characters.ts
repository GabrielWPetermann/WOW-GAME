import { Router } from 'express';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Placeholder routes - will be implemented with actual controllers
router.get('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Characters route working' });
});

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Create character route working' });
});

export default router;
