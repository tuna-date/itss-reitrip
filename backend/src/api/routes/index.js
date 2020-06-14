import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler.middleware';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import adminRoutes from './admin.route';
import placeRoutes from './place.route';
import postRoutes from './post.route';

const router = Router();

router.use('/', userRoutes);
router.use('/', authRoutes);
router.use('/', adminRoutes);
router.use('/', placeRoutes);
router.use('/', postRoutes);
router.use(errorHandler);

export default router;
