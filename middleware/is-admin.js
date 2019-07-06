const HTTPStatus = require('http-status');
const APIError = require('@api-error');

const isAdmin = (req, res, next) => {
  if (!req.accessToken || !req.accessToken.userData) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  
  if (!req.isAdmin) {
    const err = new APIError('Unauthorized', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  next();
}

module.exports = isAdmin;