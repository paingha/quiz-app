const express = require('express');
const router = express.Router();
const controller = require('@Question/controller');
const middleware = require('@middleware');

const middlewares = {
  getById: [middleware.isAuthenticated, middleware.getUser],
  update: [middleware.isAuthenticated, middleware.getUser],
  list: [middleware.isAuthenticated, middleware.getUser],
  delete: [middleware.isAuthenticated, middleware.getUser]
}

router.post('/create', controller.create);

router.post('/seed-questions', controller.seedQuestions);

router.get('/list', middlewares.list, controller.list);

router.get('/:id', middlewares.getById, controller.getById);

router.patch('/:id', middlewares.update, controller.update);

router.delete('/:id', middlewares.delete, controller.deleted);

router.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});

module.exports = router;