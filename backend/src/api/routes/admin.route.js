import { Router } from 'express';
import { adminLogin } from '../controllers/auth.controller';
import * as placeController from '../controllers/place.controller';
import * as userController from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const route = Router();

route.post('/login', adminLogin);

// User management
route.delete('/users', [auth], userController.removeUser);

// Places management
route.get('/places', [auth], placeController.getRegisteredPlaces);
route.post('/places', [auth], placeController.confirmRegistedPlace);
route.put('/places', [auth], placeController.updatePlace);
route.delete('/places', [auth], placeController.removePlace);


export default route;
