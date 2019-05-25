const _ = require('lodash');
const fetch = require('isomorphic-unfetch');
let results;
let score = 0;
let modifiedResults = [];
async function gradeNow(answers){
//change to db request to get list of questions for particular subject
 const request = await fetch('http://localhost:3500/api/questions',{
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    mode: 'cors'
 })
 const questionAndAnswers = await request.json();
  //move to different function
  //also find exam according to course id and homework id to reduce db queries
  answers.answers.map((answer)=>{
    const answerFind = _.find(questionAndAnswers.questions, (o)=>{
    return o.questionNumber == answer.questionNumber; 
    });
    if(answerFind.answer == answer.candidateAnswer){
        const {questionNumber, candidateAnswer} = answer;
        let resultObj = {
            questionNumber,
            candidateAnswer,
            "status": "Correct",
            "score": questionAndAnswers.eachPointWorth
        }
        modifiedResults.push(resultObj);
        score = score += questionAndAnswers.eachPointWorth;

    }
    else{
        const {questionNumber, candidateAnswer} = answer;
        let resultObj = {
            questionNumber,
            candidateAnswer,
            "status": "Wrong",
            "score": 0
        }
        modifiedResults.push(resultObj);
    }
  })
  let grade = {
    "scoreTotal": score
    }
    //TODO: Grade according to question set points and total points
  results = {...answers.meta, "answers": modifiedResults, grade};
  return results
}

module.exports = gradeNow;



