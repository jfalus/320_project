const { getManager } = require("./manager");
const { models } = require("../../sequelize/sequelizeConstructor");

async function isManagerOf(user, e_id) {
  var managed = await models.employees.findOne({ where: { e_id: e_id } });
  while (user != null) {
    var manager = await getManager(models.employees, managed);
    if (!manager) {
      return false;
    }
    if (manager.e_id == user.e_id) {
      return true;
    }
    managed = manager;
  }
  return false;
}

module.exports = isManagerOf;
