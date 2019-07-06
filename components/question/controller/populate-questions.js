const questions = [
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

const Question = require('@Question/model');

/**
 * Getting Seed DB with Questions
 * @property {object} filter - Filter for Questions.
 * @returns {Questions} - Array of Question object
 */

async function seedQuestions(req, res, next) {
  try {
    await questions.map(async question => {
        Question.create(question)
    })
    return res.json({message: "DB Question Seeding Done..."});
  } catch (err) {
    return next(err);
  }
}

module.exports = seedQuestions;