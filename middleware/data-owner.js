const HTTPStatus = require('http-status');
const APIError = require('@api-error');
const _ = require('lodash');

const dataOwner = (obj, field = 'merchantId') => (req, res, next) => {
  if (!req.accessToken || !req.accessToken.userData) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }

  if (req.isAdmin) {
    return next();
  }

  if (!req[obj]) {
    const err = new APIError('Not found!', HTTPStatus.NOT_FOUND, true);
    return next(err);
  }

  if (req[obj][field] != req.accessToken.userData.id) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  next();
}

module.exports = dataOwner;