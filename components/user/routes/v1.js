const express = require('express');
const router = express.Router();
const controller = require('@User/controller');
const middleware = require('@middleware');

const middlewares = {
  getById: [middleware.isAuthenticated, middleware.getUser, middleware.isOwner()],
  update: [middleware.isAuthenticated, middleware.getUser, middleware.isOwner()],
  changePassword: [middleware.isAuthenticated, middleware.getUser, middleware.isOwner()],
  updatePassword: [middleware.isAuthenticated, middleware.getUser],
  list: [middleware.isAuthenticated, middleware.getUser, middleware.isAdmin],
  destroyById: [middleware.isAuthenticated, middleware.getUser, middleware.isAdmin]
}

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/list', middlewares.list, controller.list);

router.post('/forgot-password', controller.forgotPassword);

router.post('/update-password', middlewares.updatePassword, controller.updatePassword);

router.param('id', controller.load);

router.get('/:id', middlewares.getById, controller.getById);

router.post('/:id/confirm', controller.confirm);

router.patch('/:id', middlewares.update, controller.update);

router.delete('/:id', middlewares.destroyById, controller.destroyById);

router.post('/:id/change-password', middlewares.changePassword, controller.changePassword);


router.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});

module.exports = router;