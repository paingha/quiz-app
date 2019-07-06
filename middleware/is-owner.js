const HTTPStatus = require('http-status');
const APIError = require('@api-error');
const _ = require('lodash');

const isOwner = (field = 'id') => (req, res, next) => {
  if (!req.accessToken || !req.accessToken.userData) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  if (req.isAdmin) {
    return next();
  }
  let userId = req.params[field];
  if (userId.toString() != req.accessToken.userData.id.toString()) {
    const err = new APIError('Unauthorized', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  next();
}

module.exports = isOwner;