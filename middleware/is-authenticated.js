const APIError = require('@api-error');
const HTTPStatus = require('http-status');

const isAuthenticated = (req, res, next)=> {
  if(req.isAuthenticated) {
    return next();
  }
  const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
  return next(err);
}

module.exports = isAuthenticated;