import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as commentController from '../controllers/comment.controller';

const route = Router();

route.post('/places/:place_id/posts/:post_id/comments', [auth], commentController.createComment);
route.put('/places/:place_id/posts/:post_id/comments', [auth], commentController.updateComment);
route.get('/places/:place_id/posts/:post_id/comments', [], commentController.getListComments);
route.delete('/places/:place_id/posts/:post_id/comments', [auth], commentController.removeComment);

export default route;
