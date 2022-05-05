const {getManager} = require('./manager');
const {models} = require('../../sequelize/sequelizeConstructor');

/**
 * Checks if user is managed by the manager_id param
 * @param {Express} user
 * @param {int} manager_id
 */
async function isManagedBy(user, manager_id){
  while (user != null) {
    var immediate_manager = await getManager(models.employees, user)  //finds the immediate manager of the user
    if (!user) {  //if null, then return false,
      return false
    } 
    if (user.employeeId == manager_id) {  //if they are the manager, then return true
      return true
    }
    user = immediate_manager  //otherwise, loop through and continue looking
  }
  return false
}

module.exports = isManagedBy;
