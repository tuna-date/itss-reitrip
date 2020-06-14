import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as notificationController from '../controllers/notification.controller';

const route = Router();

route.post('/notifications', [auth], notificationController.triggerNotification);
route.put('/notifications', [auth], notificationController.markSeenNotification);
route.get('/notifications', [auth], notificationController.getNotifications);

export default route;
