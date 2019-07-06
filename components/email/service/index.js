const NewUser = require('./new-user');
const service = new (require('events').EventEmitter)();

service.on('new-user', NewUser);
module.exports = service;