const User = require('@User/model');
const HTTPStatus = require('http-status');
const APIError = require('@api-error');
const jwt = require('jsonwebtoken');
const CONFIG = require('@CONFIG');
const _ = require('lodash');
const EmailService = require('@Email/service');

/**
 * Returns object for success if user email found
 * @property {string} req.body.email - The email of user.
 * @returns {message}
 */
async function forgotPassword(req, res, next) {
  let body = req.body;

  let filter = {
    where: {
      email: body.email
    }
  }

  try {
    let user = await User.findOne(filter);
    if (!user) {
      const err = new APIError('User not registered.', HTTPStatus.UNAUTHORIZED);
      return next(err);
    }
    let userData = _.pick(user, ['id']);
    const token = jwt.sign(userData, CONFIG.jwtSecret, { expiresIn: CONFIG.jwtPasswordResetExpiry });
    let data = {
      token,
      user
    }

    EmailService.emit('forgot-password', data);

    return res.json({
      message: 'Reset Password link has been sent to your email.',
      status: 200
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = forgotPassword;