import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { login, register } from '../controllers/auth.controller';
import { getCurrentUser } from '../controllers/user.controller';

const route = Router();

route.post('/auth/register', register);
route.post('/auth/login', login);
route.get('/auth/currentUser', [auth], getCurrentUser);

export default route;
