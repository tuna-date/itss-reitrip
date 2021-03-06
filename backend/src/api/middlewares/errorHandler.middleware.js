import errors from '../../helpers/errors';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  switch (err.message) {
    case errors.USER_NOT_FOUND:
      res.status(400).send(errors.USER_NOT_FOUND);
      break;
    case errors.EMAIL_PASS_NOT_MATCH:
      res.status(400).send(errors.EMAIL_PASS_NOT_MATCH);
      break;
    case errors.EMAIL_WAS_REGISTED:
      res.status(400).send(errors.EMAIL_WAS_REGISTED);
      break;
    case errors.UNAUTH:
      res.status(401).send(errors.UNAUTH);
      break;
    case errors.ADMIN_NOT_FOUND:
      res.status(401).send(errors.ADMIN_NOT_FOUND);
      break;
    case errors.NOT_ADMIN:
      res.status(400).send(errors.NOT_ADMIN);
      break;
    case errors.PLACE_NOT_FOUND:
      res.status(400).send(errors.PLACE_NOT_FOUND);
      break;
    case errors.POST_NOT_FOUND:
      res.status(400).send(errors.POST_NOT_FOUND);
      break;
    case errors.NO_PRIVILEGE:
      res.status(400).send(errors.NO_PRIVILEGE);
      break;
    default:
      res.status(503).send(err.message);
  }
}

export default errorHandler;
