const HTTPStatus = require('http-status');
const APIError = require('@api-error');
const _ = require('lodash');

const setOwner = (field = 'merchantId') => (req, res, next)=> {
  if(!req.accessToken || !req.accessToken.userData) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  if(req.isAdmin && req.body[field]) {
    return next();
  }

  req.body[field] = req.accessToken.userData.id;
  
  next();
}

module.exports = setOwner;