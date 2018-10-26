import { Router } from 'express';
import { isAuthenticated } from '../config/passport';
import { authRoutes } from './auth';
import { accountRoutes } from './account';

const router = Router();

router.use('/auth', authRoutes);

// Protected routes
router.use('/account', isAuthenticated(), accountRoutes);

export default router;
