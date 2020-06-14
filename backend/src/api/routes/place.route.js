import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as placeController from '../controllers/place.controller';

const route = Router();

route.post('/places', [auth], placeController.registerPlace);
route.get('/places/:id', [auth], placeController.getPlace);
route.get('/places', [auth], placeController.getListPlaces);
route.post('/places/:id/rate', [auth], placeController.ratePlace);
route.post('/places/search', [auth], placeController.searchPlaces);

export default route;
