import { Router } from 'express';
import { adminLogin } from '../controllers/auth.controller';
import * as placeController from '../controllers/place.controller';
import * as userController from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const route = Router();

route.post('/admin/login', adminLogin);

// User management
route.delete('/admin/users', [auth], userController.removeUser);

// Places management
route.get('/admin/places', [auth], placeController.getRegisteredPlaces);
route.post('/admin/places', [auth], placeController.confirmRegistedPlace);
route.put('/admin/places', [auth], placeController.updatePlace);
route.delete('/admin/places', [auth], placeController.removePlace);

export default route;
