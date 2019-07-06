const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const _ = require('lodash');
const env = process.env.NODE_ENV || 'production';

const commonConfig = {
  env: env,
  root: rootPath,
  SALT_WORK_FACTOR: 10,
  jwtPasswordResetExpiry: process.env.JWT_PASSWORD_RESET_EXPIRY || 30 * 60
};

const config = require(`./${env}`);

const exportConfig = _.merge(commonConfig, config);

module.exports = exportConfig;