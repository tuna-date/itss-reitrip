import { Router } from 'express';
import { adminLogin } from '../controllers/auth.controller';

const route = Router();

route.post('/login', adminLogin);

export default route;
