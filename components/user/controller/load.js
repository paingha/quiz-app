const User = require('@User/model');
const HTTPStatus = require('http-status');
const APIError = require('@api-error');

/**
 *  Load user if id found in params
 */
async function load(req, res, next, id) {
  try {
    let user = await User.findByPk(id);

    if (!user) {
      const err = new APIError('No such user exists!', HTTPStatus.NOT_FOUND, true);
      return next(err);
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = load;