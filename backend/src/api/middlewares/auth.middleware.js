import jwt from 'jsonwebtoken';
import errors from '../../helpers/errors';

export async function auth(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.params.currentUserId = decoded.id;
    next();
  } catch (err) {
    next(new Error(errors.UNAUTH));
  }
}

export default auth;
