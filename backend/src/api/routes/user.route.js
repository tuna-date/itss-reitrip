import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as userController from '../controllers/user.controller';

const route = Router();

route.get('/:id', [auth], userController.getUser);
route.get('/', [auth], userController.getListUsers);
route.put('/', [auth], userController.updateUserInfo);

export default route;
