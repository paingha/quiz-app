const Question = require('@Question/model');
const Sequelize = require("sequelize");
const sequelize = require("@Sequelize").get();

/**
 * Getting List Questions
 * @property {object} filter - Filter for Questions.
 * @returns {Question} - Array of Questions object
 */

async function list(req, res, next) {
  let offsetParams = req.query.offset;
  try {
    let questionList = await Question.findAndCountAll({
      limit: 20,
      offset: offsetParams,
      order: sequelize.random()
    });
    return res.json(questionList);
  } catch (err) {
    return next(err);
  }
}

module.exports = list;