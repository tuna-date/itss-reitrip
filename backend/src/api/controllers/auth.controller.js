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

export default register;
