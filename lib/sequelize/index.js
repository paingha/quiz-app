const Sequelize = require('sequelize');
const CONFIG = require('@CONFIG');



let instance;

const init = ()=> {
  instance = new Sequelize(CONFIG.dbUrl);

}

const get = ()=> {
  if(!instance) {
    throw Error('Error not yet ready...');
  }

  return instance;
}

const sequelize = {
  init,
  get
}

module.exports = sequelize;