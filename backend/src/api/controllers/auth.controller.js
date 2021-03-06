import * as authServices from '../services/auth.service';

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const response = await authServices.register({ username, email, password });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const response = await authServices.login({ email, password });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const { currentUserId } = req.params;

    const response = await authServices.adminLogin({ email, password, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
