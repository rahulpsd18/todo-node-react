import { Router } from 'express';
import { isAuthenticated } from '../config/passport';
import { authRoutes } from './auth';
import { accountRoutes } from './account';
import { taskRoutes } from './task';

const router = Router();

router.use('/auth', authRoutes);

// Protected routes
router.use('/task', isAuthenticated(), taskRoutes);
router.use('/account', isAuthenticated(), accountRoutes);

export default router;
