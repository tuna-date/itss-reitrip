import * as postServices from '../services/post.service';

export async function createPost(req, res, next) {
  try {
    const { content } = req.body;
    const { place_id, currentUserId } = req.params;

    const response = await postServices.createPost({
      user_id: currentUserId,
      place_id,
      content,
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const { id, content } = req.body;

    const response = await postServices.updatePost({ id, content });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}


export async function getListPosts(req, res, next) {
  try {
    const { place_id } = req.params;
    const response = await postServices.getListPosts({ place_id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getPost(req, res, next) {
  try {
    const { id } = req.params;

    const response = await postServices.getPost({ id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function removePost(req, res, next) {
  try {
    const { currentUserId } = req.params;
    const { id } = req.body;
    const response = await postServices.removePost({ id, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}


export async function upvotePost(req, res, next) {
  try {
    const { currentUserId, id } = req.params;
    const response = await postServices.upvotePost({
      user_id: currentUserId,
      id,
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUserPosts(req, res, next) {
  try {
    const { currentUserId } = req.params;

    const response = await postServices.getCurrentUserPosts({ currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
