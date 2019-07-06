const User = require('@User/model');
const HTTPStatus = require('http-status');
const APIError = require('@api-error');

/**
 *  Confirm User through email verification link
 */
async function confirm(req, res, next) {
  let user = req.user;
  let token = req.query.token;

  if (!token) {
    const err = new APIError('Token is required!', HTTPStatus.UNPROCESSABLE_ENTITY, true);
    return next(err);
  }

  if(user.emailVerified) {
    const err = new APIError('Already Verified! Please login to continue!!', HTTPStatus.FORBIDDEN, true);
    return next(err);
  }

  if (token != user.verifyToken) {
    const err = new APIError('Invalid Token!', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }

  try {
    user.verifyToken = null;
    user.emailVerified = true;
    
    let updatedInstance = await user.save();

    res.json({message: "Email Verified"})

  } catch (err) {
    return next(err);
  }
}

module.exports = confirm;