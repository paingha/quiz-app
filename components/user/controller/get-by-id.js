const User = require('@User/model');

/**
 * Getting user by Id
 * @property {string} req.user - The user from id.
 * @returns {User} - User object
 */

function getById(req, res, next) {
  let user = req.user;
  return res.json(user.safeModel());
}

module.exports = getById;