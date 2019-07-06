const model = require('./model');
const controller = require('./controller');
const routes = require('./routes');

const User = {
  model,
  controller,
  routes
}

module.exports = User;