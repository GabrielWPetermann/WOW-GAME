import { Router } from 'express';

const router = Router();

// Placeholder routes - will be implemented with actual controllers
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Levels route working' });
});

export default router;
