const User = require('@User/model');

/**
 * Deleting Reply by Id
 * @property {string} req.user - The Reply from id.
 * @returns {User} - Forum object
 */

function destroyById(req, res, next) {
  let user = req.params.id;
  User.destroy({
    where: {
      id: user
    }
  })
  return res.json({
    message: "deleted"
  });
}

module.exports = destroyById;