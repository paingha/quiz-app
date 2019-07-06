const Alias = require('./alias');


// connect to db
const sequelize = require('@Sequelize');
sequelize.init();
const Sequelize = sequelize.get();

const ModelAlias = require('./model-alias');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const chalk = require('chalk');
const helmet = require('helmet');
const path = require('path');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const HTTPStatus = require('http-status');

const APIRoutes = require('@api');

const APIError = require('@api-error');

// config variabls
const CONFIG = require('@CONFIG');

//LIB
const logger = require('@winston');

//Express
const app = express();

//Morgan
app.use(morgan('dev'));

// Parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());

app.use(cors());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'public')));

if (CONFIG.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  }));
}

require('@boot')();
app.use('/api', APIRoutes);

app.get('/*', (req, res, next) => {
  res.render('index');
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    return res.status(err.status).json({
      error: {
        message: unifiedErrorMessage,
        status: err.status,
        stack: CONFIG.env === 'development' ? err.stack : {}
      }
    });
  } else if (!(err instanceof APIError)) {
    return res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        message: err.message,
        status: err.status || 500,
        stack: CONFIG.env === 'development' ? err.stack : {}
      }
    });
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', HTTPStatus.NOT_FOUND);
  return next(err);
});

if (CONFIG.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance: logger
  }));
}

app.use((err, req, res, next) =>
  res.status(err.status).json({
    error: {
      message: err.message,
      status: err.status,
      stack: CONFIG.env === 'development' ? err.stack : {}
    }
  })
);
const start = () => {
  app.listen(CONFIG.port, (err) => {
    if (err) {
      logger.error(err);
      throw err;
    }
    logger.info(`server started on port ${CONFIG.port} ${CONFIG.env}`);
  });
}


Sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully...');
    start();
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = app;