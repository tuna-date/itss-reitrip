import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as userController from '../controllers/user.controller';

const route = Router();

route.get('/users/:id', [auth], userController.getUser);
route.get('/users', [auth], userController.getListUsers);
route.put('/users', [auth], userController.updateUserInfo);

export default route;
