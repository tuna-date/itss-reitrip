import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import adminRoutes from './admin.route';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use(errorHandler);

export default router;
