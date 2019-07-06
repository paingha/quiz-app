const User = require('@User/model');
const HTTPStatus = require('http-status');
const APIError = require('@api-error');

async function getUser(req, res, next) {
  if (!req.isAuthenticated) {
    const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
    return next(err);
  }
  let userId = req.accessToken.data.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      const err = new APIError('Unauthenticated', HTTPStatus.UNAUTHORIZED, true);
      return next(err);
    }
    req.accessToken['userData'] = user;
    req['isAdmin'] = user.isAdmin;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = getUser;