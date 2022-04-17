const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');
const {getManager} = require('./manager');

//req is manager of e_id?
async function isManagerOf(req, e_id){
  while(e_id != null){
    const manager = getManager(e_id)
    if(!manager){
      return false
    }
    if(manager.e_id == req){
      return true
    }
    e_id = manager
  }
  return false
}

module.exports = isManagerOf;