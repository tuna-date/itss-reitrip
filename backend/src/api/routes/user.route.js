import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { getUser, getListUsers } from '../controllers/user.controller';

const route = Router();

route.get('/:id', [auth], getUser);
route.get('/', [auth], getListUsers);

export default route;
