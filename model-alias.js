const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@User': __dirname + '/components/user', 
  '@Email': __dirname + '/components/email',
  '@Question': __dirname + '/components/question',
  '@middleware': __dirname + '/middleware'  
})