const Sequelize = require("sequelize");
const sequelize = require("@Sequelize").get();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const CONFIG = require("@CONFIG");
const randomstring = require("randomstring");
const APIError = require("@api-error");
const HTTPStatus = require("http-status");
const EmailService = require("@Email/service");

var someDate = new Date();
var numberOfDaysToAdd = 2;
     
const Question = sequelize.define("question", {
  subject: Sequelize.STRING,
  courseId: Sequelize.STRING,
  taughtBy: Sequelize.STRING,
  timitLimit: Sequelize.STRING,
  quizQuestionNumber: { type: Sequelize.INTEGER },
  eachPointWorth: { type: Sequelize.INTEGER },
  totalPointsAttainable: { type: Sequelize.INTEGER },
  dueDate: { type: Sequelize.DATE, defaultValue: someDate.setDate(someDate.getDate() + numberOfDaysToAdd) },
  questions: { type: Sequelize.ARRAY(Sequelize.JSONB), defaultValue: [] }
});

/*Question.beforeCreate((question, options) => {
    question.dueDate = 
    return user;
  }); */

module.exports = Question;