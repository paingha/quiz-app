const create = require('./create');
const update = require('./update');
const list = require('./list');
const getById = require('./get-by-id');
const deleted = require('./delete');
const seedQuestions = require('./populate-questions');
const Controller = {
  create,
  update,
  getById,
  deleted,
  list,
  seedQuestions
}

module.exports = Controller;