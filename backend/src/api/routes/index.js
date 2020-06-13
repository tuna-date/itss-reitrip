import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import adminRoutes from './admin.route';
import placeRoutes from './place.route';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/places', placeRoutes);
router.use(errorHandler);

export default router;
