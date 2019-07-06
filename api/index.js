const express = require('express');
const apiRoutes = express();

const middleware = require('@middleware');

const v1Routes = require('@api/v1');

apiRoutes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.url}`);
});

apiRoutes.use('/', middleware.authentication);
apiRoutes.use('/v1', v1Routes);
apiRoutes.use('/', v1Routes);

module.exports = apiRoutes;