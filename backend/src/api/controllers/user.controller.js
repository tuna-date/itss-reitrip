import * as userServices from '../services/user.service';

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;

    const response = await userServices.getUser({ id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const { currentUserId } = req.params;

    const response = await userServices.getCurrentUser({ currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getListUsers(req, res, next) {
  try {
    const { currentUserId } = req.params;
    const response = await userServices.getListUsers({ currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function updateUserInfo(req, res, next) {
  try {
    const { username, avatar_url } = req.body;
    const { currentUserId } = req.params;

    const response = await userServices.updateUserInfo({ username, avatar_url, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}


export async function removeUser(req, res, next) {
  try {
    const { user_id } = req.body;
    const { currentUserId } = req.params;

    const response = await userServices.removeUser({ user_id, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
