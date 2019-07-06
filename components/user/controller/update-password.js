const User = require('@User/model');
const HTTPStatus = require('http-status');

/**
 *  Returns jwt token and user details if valid email and password are provided
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, User}
 */
async function updatePassword(req, res, next) {
  let body = req.body;
  let query = req.query || {};
  let compare = false;
  let id = req.accessToken.data.id;

  try {
    let user = await User.changePassword(id, null, body.password, compare);
    res.json({
      message: 'Password updated successfully',
      status: HTTPStatus.OK
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = updatePassword;