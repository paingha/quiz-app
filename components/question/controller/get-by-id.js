
const Question = require('@Question/model');
const HTTPStatus = require('http-status');
const APIError = require('@api-error');

/**
 * Get Question by Id
 * @property {string} req.question - The Question from id.
 * @returns {Question} - Question object
 */


async function getById(req, res, next) {
let question_id = req.params.id
let filter = {
  where: {
    id: question_id,
  }
}
  try {
    await Question.findOne({
        where: filter.where,
    }).then((questions) => {
        res.json(questions)
    })
  } catch (err) {
    return next(err);
  }
}

module.exports = getById;