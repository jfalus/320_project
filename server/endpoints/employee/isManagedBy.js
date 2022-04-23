const {getManager} = require('./manager');
const {models} = require('../../sequelize/sequelizeConstructor');

async function isManagedBy(user, manager_id){
  while (user != null) {
    var immediate_manager = await getManager(models.employees, user)
    if (!user) {
      return false
    } 
    if (user.e_id == manager_id) {
      return true
    }
    user = immediate_manager
  }
  return false
}

module.exports = isManagedBy;
