const Question = require('@Question/model');
const CONFIG = require('@CONFIG');
const _ = require('lodash');

/**
 * Create a new question
 * @property {Object} req.body - Details of Question.
 * @returns {Question}
 */
async function create(req, res, next) {
  const body = req.body;
  try {
    const question = await Question.create(body);
    return res.json(question);
  } catch (exec) {
    return next(exec);
  }
}

module.exports = create;