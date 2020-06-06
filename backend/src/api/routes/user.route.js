import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { getUser } from '../controllers/user.controller';

const route = Router();

route.get('/:id', [auth], getUser);

export default route;
