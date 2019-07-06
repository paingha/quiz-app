const User = require('@User/model');
const HTTPStatus = require('http-status');
const jwt = require('jsonwebtoken');
const APIError = require('@api-error');
const CONFIG = require('@CONFIG');
const _ = require('lodash');

/**
 *  Returns jwt token and user details if valid email and password are provided
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, User}
 */
async function login(req, res, next) {
  const body = req.body;
  if (!body.email) {
    const err = new APIError('Email is required.', HTTPStatus.FORBIDDEN);
    return next(err);
  }
  if (!body.password) {
    const err = new APIError('Password is required.', HTTPStatus.FORBIDDEN);
    return next(err);
  }
  let filter = {
    where: {
      email: body.email
    }
  }
  try {
    let userInstance = await User.findOne(filter);

    if (!userInstance) {
      const err = new APIError('User not registered.', HTTPStatus.UNAUTHORIZED);
      return next(err);
    }

    if (!userInstance.comparePassword(body.password)) {
      const err = new APIError('User email and password combination do not match', HTTPStatus.UNAUTHORIZED);
      return next(err);
    }

    if(!userInstance.emailVerified) {
      const err = new APIError('Email not verified. Please verify your email!', HTTPStatus.UNAUTHORIZED);
      return next(err);
    }

    let userData = _.pick(userInstance, ['id']);
    const token = jwt.sign(userData, CONFIG.jwtSecret, {});
    return res.json({
      token,
      user: userInstance.safeModel()
    });

  } catch (exec) {
    return next(exec);
  }
}

module.exports = login;