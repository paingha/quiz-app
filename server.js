const express = require('express');
const chalk = require('chalk')
const cors = require('cors');
const path = require('path');
const gradeNow = require('./index');
const app = express();
//instalize middleware here
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '.', 'public')));


app.get('/api', (req, res)=> {
    res.send('Test Api')
  })
app.get('/api/questions', (req, res)=> {
    var someDate = new Date();
    var numberOfDaysToAdd = 2;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
    const questionAndAnswers = {
        "subject": "Chemistry",
        "courseId": "7575145",
        "taughtBy": "James Peters",
        "timeLimit": "3600",
        "quizQuestionNumber": 6,
        "eachPointWorth": 5,
        "totalPointsAttainable": 30,
        "dueDate": someDate,
        "questions": [
        {
          "questionNumber": 4,
          "question": "Metals of the first transition series have special proper ties which are different from those of groups I and II elements because they have partially filled",
          "answer": "C",
          "options": [
            {
              "letterOption": "A",
              "option": "s  orbitals",
            },
            {
              "letterOption": "B",
              "option": "p orbitals",
            },
            {
              "letterOption": "C",
              "option": "d orbitals",
            },
            {
              "letterOption": "D",
              "option": "f orbitals",
            }
          ]
        },
        {
          "questionNumber": 9,
          "question": "Milikan\u2019s contribution to the development of atomic theory is the determination of",
          "answer": "C",
          "options": [
            {
              "letterOption": "A",
              "option": "Charge on electron",
            },
            {
              "letterOption": "B",
              "option": "Positive rays",
            },
            {
              "letterOption": "C",
              "option": "Charge to amss ratio",
            },
            {
              "letterOption": "D",
              "option": "Cathode rays",
            }
          ]
        },
        {
          "questionNumber": 12,
          "question": "Benzene reacts with hydrogen in the presence of nickel catalyst at 1800C to give",
          "answer": "C",
          "options": [
            {
              "letterOption": "A",
              "option": "Toluene",
            },
            {
              "letterOption": "B",
              "option": "Cyclopentane",
            },
            {
              "letterOption": "C",
              "option": "Cyclohexane",
            },
            {
              "letterOption": "D",
              "option": "Xylene",
            }
          ]
        },
        {
          "questionNumber": 78,
          "question": "The pair of organic compounds that are isomers is",
          "answer": "D",
          "options": [
            {
              "letterOption": "A",
              "option": "Benzene and methylbenzene",
            },
            {
              "letterOption": "B",
              "option": "Trichloromethane and Tetrachloromethane",
            },
            {
              "letterOption": "C",
              "option": "Ethanol and propanone",
            },
            {
              "letterOption": "D",
              "option": "But-1-ene and but-2-ene",
            }
          ]
        },
        {
          "questionNumber": 41,
          "question": "Natural water collected from rivers and ponds contains oxygen, carbon(IV) oxide and",
          "answer": "C",
          "options": [
            {
              "letterOption": "A",
              "option": "Chlorine",
            },
            {
              "letterOption": "B",
              "option": "Hydrogen",
            },
            {
              "letterOption": "C",
              "option": "Sulphur(IV) oxide",
            },
            {
              "letterOption": "D",
              "option": "Nitrogen",
            }
          ]
        },
        {
          "questionNumber": 33,
          "question": "The mass of silver deposited when a current of 10A is passed through a solution of silver salt for 4830s is    [Ag = 108, F = 96500 Cmol-1]",
          "answer": "B",
          "options": [
            {
              "letterOption": "A",
              "option": "108.0g",
            },
            {
              "letterOption": "B",
              "option": "54.0g",
            },
            {
              "letterOption": "C",
              "option": "27.0g",
            },
            {
              "letterOption": "D",
              "option": "13.5g",
            }
          ]
        }
      ]
    };    
    res.json(questionAndAnswers);
  })
app.post('/api/questions/answer', async(req, res)=> { 
    let result = await gradeNow(req.body);
    res.json(result);
  })
app.get('/*', (req, res, next) => {
    res.render('index');
  });
  app.listen(3500, ()=>{
    console.log(chalk.green("App started..."))
  })