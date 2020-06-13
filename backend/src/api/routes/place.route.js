import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as placeController from '../controllers/place.controller';

const route = Router();

route.post('/', [auth], placeController.registerPlace);
route.get('/:id', [auth], placeController.getPlace);
route.get('/', [auth], placeController.getListPlaces);
route.post('/:id/rate', [auth], placeController.ratePlace);
route.post('/search', [auth], placeController.searchPlaces);

export default route;
