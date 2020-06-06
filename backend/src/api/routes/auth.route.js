import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { register } from '../controllers/auth.controller';

const route = Router();

route.post('/', [auth], register);

export default route;
