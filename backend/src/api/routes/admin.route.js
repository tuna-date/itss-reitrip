import { Router } from 'express';
import { adminLogin } from '../controllers/auth.controller';
import * as placeController from '../controllers/place.controller';
import { auth } from '../middlewares/auth.middleware';

const route = Router();

route.post('/login', adminLogin);

// Places manager
route.get('/places', [auth], placeController.getRegisteredPlaces);
route.post('/places', [auth], placeController.confirmRegistedPlace);
route.put('/places/:id', [auth], placeController.updatePlace);
route.delete('/places/:id', [auth], placeController.removePlace);


export default route;
