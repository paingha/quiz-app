const authentication = require('./authentication');
const isAuthenticated = require('./is-authenticated');
const getUser = require('./get-user');
const isAdmin = require('./is-admin');
const isOwner = require('./is-owner');
const setOwner = require('./set-owner');
const dataOwner = require('./data-owner');

const middleware = {
  authentication,
  isAuthenticated,
  getUser,
  isAdmin,
  isOwner,
  setOwner,
  dataOwner,
}

module.exports = middleware;