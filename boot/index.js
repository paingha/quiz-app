const User = require('@User/model');
const Question = require('@Question/model');

const boot = ()=> {
  User.sync();
  Question.sync();
}

module.exports = boot;