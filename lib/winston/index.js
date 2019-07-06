const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ]
});

if (!process.env.NODE_ENV || (process.env.NODE_ENV === 'development')) {
  logger.level = 'debug';
}

module.exports = logger;
