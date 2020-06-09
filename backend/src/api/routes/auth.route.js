import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { login, register } from '../controllers/auth.controller';
import { getCurrentUser } from '../controllers/user.controller';

const route = Router();

route.post('/register', register);
route.post('/login', login);
route.get('/currentUser', [auth], getCurrentUser);

export default route;
