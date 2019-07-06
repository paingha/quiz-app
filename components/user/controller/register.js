const User = require("@User/model");
const HTTPStatus = require("http-status");
const jwt = require("jsonwebtoken");
const APIError = require("@api-error");
const CONFIG = require("@CONFIG");
const _ = require("lodash");
const Sequelize = require("sequelize");

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @property {string} req.query.ref - User referred by.
 * @returns {User}
 */


async function register(req, res, next) {
  const user_email = req.body.email;
  const user_password = req.body.password;
  const user_firstName = req.body.firstName;
  const user_lastName = req.body.lastName;
  
  //let fixBug = 0;
  const user = User.build({
    email: user_email,
    password: user_password,
    firstName: user_firstName,
    lastName: user_lastName,
  });
  let filter = {
    where: {
      email: req.body.email
    }
  };

  try {
    let userInstance = await User.findOne(filter);

    if (userInstance) {
      return next(
        new APIError("Email already registered", HTTPStatus.CONFLICT)
      );
    }

    await user.save();

    return res.json({
      message:
        "Your account has been registered. Please check your email to confirm.",
      status: 200
    });
  } catch (exec) {
    return next(exec);
  }
}

module.exports = register;
