const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@root': __dirname,
  '@boot': __dirname + '/boot',
  '@api': __dirname + '/api',
  '@services': __dirname + '/services',
  '@lib': __dirname + '/lib',
  '@CONFIG': __dirname + '/config',
  '@api-error': __dirname + '/lib/api-error',
  '@winston': __dirname + '/lib/winston',
  '@Sequelize': __dirname + '/lib/sequelize',
})