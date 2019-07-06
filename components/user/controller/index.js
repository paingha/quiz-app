const register = require('./register');
const login = require('./login');
const load = require('./load');
const getById = require('./get-by-id');
const confirm = require('./confirm');
const update = require('./update');
const changePassword = require('./change-password');
const forgotPassword = require('./forgot-password');
const updatePassword = require('./update-password');
const list = require('./list');
const destroyById = require('./destroy-by-id');
const Controller = {
  register,
  login,
  load,
  getById,
  confirm,
  update,
  changePassword,
  forgotPassword,
  updatePassword,
  list,
  destroyById,
}

module.exports = Controller;