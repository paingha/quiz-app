const Sequelize = require("sequelize");
const sequelize = require("@Sequelize").get();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const CONFIG = require("@CONFIG");
const randomstring = require("randomstring");
const APIError = require("@api-error");
const HTTPStatus = require("http-status");
const EmailService = require("@Email/service");

const User = sequelize.define("user", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "The email you entered is invalid."
      }
    }
  },
  password: Sequelize.STRING,
  emailVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
  isDisabled: { type: Sequelize.BOOLEAN, defaultValue: false },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: false },
  isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
  verifyToken: Sequelize.STRING,
});

/**
 * Hash the plain password
 * @param {String} plain - Plain password.
 * @returns {String} - Hashed password.
 */
const hashPassword = plain => {
  const salt = bcrypt.genSaltSync(CONFIG.SALT_WORK_FACTOR);
  return bcrypt.hashSync(plain, salt);
};

User.hashPassword = hashPassword;

async function changePassword(id, oldPassword, newPassword, compare = true) {
  const User = this;
  if (!newPassword) {
    const err = new APIError(
      "New Password is required!",
      HTTPStatus.FORBIDDEN,
      true
    );
    return Promise.reject(err);
  }

  if (compare && !oldPassword) {
    const err = new APIError(
      "Old Password is required!",
      HTTPStatus.FORBIDDEN,
      true
    );
    return Promise.reject(err);
  }

  try {
    let user = await User.findById(id);
    if (!user) {
      const err = new APIError(
        "No such user exists!",
        HTTPStatus.NOT_FOUND,
        true
      );
      return Promise.reject(err);
    }
    if (compare) {
      if (!user.comparePassword(oldPassword)) {
        const err = new APIError(
          "Old Password is invalid!",
          HTTPStatus.FORBIDDEN,
          true
        );
        return Promise.reject(err);
      }
    }
    user.password = newPassword;

    await user.save();

    return Promise.resolve(user.safeModel());
  } catch (err) {
    return Promise.reject(err);
  }
}

User.changePassword = changePassword;
const generateVerificationToken = () => {
  return randomstring.generate({ length: 64 });
};

User.beforeUpdate((user, options) => {
  if (user.changed("password")) {
    user.password = hashPassword(user.password);
  }
  return user;
});

User.beforeCreate((user, options) => {
  user.password = hashPassword(user.password);
  user.verifyToken = generateVerificationToken();
  return user;
});

User.afterCreate((user, options) => {
  if(!user.emailVerified){
  EmailService.emit("new-user", user);
  }
});

User.prototype.safeModel = function() {
  let user = this;
  let userData = _.omit(user.dataValues, ["password", "verifyToken"]);
  return userData;
};

function comparePassword(plain) {
  const user = this;
  return bcrypt.compareSync(plain, user.password);
}

User.prototype.comparePassword = comparePassword;

module.exports = User;
