const User = require('@User/model');
const _ = require('lodash');
const FIELDS_RESTRICT_TO_UPDATE = ['emailVerified'];
/**
 * Updating user
 * @property {string} req.body - The fields to be updated.
 * @returns {User} - Updated User object
 */

async function update(req, res, next) {
  const body = req.body;
  let user = req.user;

  if (!user.isAdmin) {
    body = _.omit(body, FIELDS_RESTRICT_TO_UPDATE);
  }
  const result = _.omitBy(body, _.isEmpty);

  user = _.merge(user, result);

  try {
    let updatedInstance = await user.save();
    res.json(updatedInstance.safeModel());
  } catch (err) {
    next(err);
  }
}

module.exports = update;