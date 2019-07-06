const Question = require('@Question/model');
const _ = require('lodash');

/**
 * Updating question
 * @property {Object} req.body - The fields to be updated.
 * @returns {Question} - Updated Question object
 */

async function update(req, res, next) {
  const body = req.body;
  const id = req.params.id
  
  try {
    Question.findById(id).then(question_res => {
      
      question_res.update({...req.body});
      res.json({
        message: "Updated Successfully"
      });
    })
   
  } catch (err) {
    next(err);
  }
}

module.exports = update;