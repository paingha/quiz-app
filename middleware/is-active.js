const HTTPStatus = require('http-status');
const APIError = require('@api-error');
const _ = require('lodash');

const isActive = (req, res, next) => {
  if (!req.accessToken || !req.accessToken.userData) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  if (req.isAdmin) {
    return next();
  }
  let userId = req.params[field];
  if (!req.accessToken.userData.isActive) {
    const err = new APIError('Not Active!', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  next();
}

module.exports = isActive;