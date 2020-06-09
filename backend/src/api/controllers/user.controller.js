import * as userServices from '../services/user.service';

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;

    const response = await userServices.getUser(id);

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req, res, next) {
  try {
    const response = userServices.getUsers();

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
