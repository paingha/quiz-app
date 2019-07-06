const Question = require('@Question/model');

/**
 * Deleting Question by Id
 * @property {string} req.question - The Question from id.
 * @returns {Question} - Question object
 */

function destroyById(req, res, next) {
  let question = req.params.id;
  Question.destroy({
    where: {
      id: question
    }
  })
  return res.json({
    message: "deleted"
  });
}

module.exports = destroyById;