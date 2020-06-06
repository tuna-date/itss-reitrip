// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  res.status(503).send(err.message);
}

export default errorHandler;
