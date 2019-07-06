const HTTPStatus = require('http-status');
const APIError = require('@api-error');
const jwt = require('jsonwebtoken');
const logger = require('@winston');
const CONFIG = require('@CONFIG');

const authentication = (req, res, next) => {
  let token = req.get('Authorization') || req.get('authorization') || req.query.access_token;
  if (!token) {
    req['isAuthenticated'] = false;
    return next();
  }
  try {
    let decoded = jwt.verify(token, CONFIG.jwtSecret);
    req['accessToken'] = {
      token,
      data: decoded || {}
    };
    req['isAuthenticated'] = true;
    next();
  } catch (exec) {
    let message = 'Invalid Token!';
    if (exec.message && exec.message.indexOf('expired') > -1) {
      message = 'Token is expired!'
    }
    logger.error('INVALID TOKEN > ', exec);
    const err = new APIError(message, HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
}

module.exports = authentication;