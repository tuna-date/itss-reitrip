import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as postController from '../controllers/post.controller';

const route = Router();

route.post('/places/:place_id/posts', [auth], postController.createPost);
route.put('/places/:place_id/posts', [auth], postController.updatePost);
route.get('/places/:place_id/posts/:id', [auth], postController.getPost);
route.get('/places/:place_id/posts', [auth], postController.getListPosts);
route.delete('/places/:place_id/posts', [auth], postController.removePost);
route.post('/places/:place_id/posts/:id/upvote', [auth], postController.upvotePost);
route.get('/places/:place_id/currentUserPosts', [auth], postController.getCurrentUserPosts);

export default route;
