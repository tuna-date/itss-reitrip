import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const route = Router();

route.post('/register', register);
route.post('/login', login);

export default route;
