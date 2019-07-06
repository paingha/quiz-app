const express = require('express');
const router = express.Router();

const UserRoutes = require('@User/routes/v1');
const QuestionRoutes = require('@Question/routes/v1');

router.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});

router.use('/user', UserRoutes);
router.use('/question', QuestionRoutes);

module.exports = router;