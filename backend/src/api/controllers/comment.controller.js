import * as commentServices from '../services/comment.service';

export async function createComment(req, res, next) {
  try {
    const { content } = req.body;
    const { post_id, currentUserId } = req.params;

    const response = await commentServices.createComment({
      user_id: currentUserId,
      post_id,
      content,
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function updateComment(req, res, next) {
  try {
    const { id, content } = req.body;

    const response = await commentServices.updateComment({ id, content });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function removeComment(req, res, next) {
  try {
    const { currentUserId } = req.params;
    const { id } = req.body;
    const response = await commentServices.removeComment({ id, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getListComments(req, res, next) {
  try {
    const { post_id } = req.params;
    const response = await commentServices.getListComments({ post_id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
