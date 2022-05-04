const { getManager } = require("./manager");
const { models } = require("../../sequelize/sequelizeConstructor");

/**
 * Checks if user is the manager of the e_id param
 * @param {Express} user
 * @param {int} e_id
 */
async function isManagerOf(user, e_id) {
  var managed = await models.employees.findOne({ where: { e_id: e_id } });  //find an employee managed by e_id
  while (user != null) {  
    var manager = await getManager(models.employees, managed);  //find the manager of the managed employee
    if (!manager) { //if null, return false
      return false;
    }
    if (manager.e_id == user.e_id) {  //if found, return true
      return true;
    }
    managed = manager;  //otherwise, continue searching by descending the tree
  }
  return false;
}

module.exports = isManagerOf;
