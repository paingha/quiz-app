const User = require('@User/model');

/**
 * Getting Users
 * @property {object} filter - Filter for User.
 * @returns {User} - Array of User object
 */

async function list(req, res, next) {
  const offsetParams = req.query.offset;
  try {
    let userList = await User.findAndCountAll({
      limit: 12,
      offset: offsetParams,
    });
    return res.json(userList);
  } catch (err) {
    return next(err);
  }
}

module.exports = list;