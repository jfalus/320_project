const {getManager} = require('./manager');
const {models} = require('../../sequelize/sequelizeConstructor');


async function isManagerOf(assigner, assigned_to, bool_at) {
  const arr = []
  for (let i = 0; i < assigned_to.length; i++) {
    arr[i] = await models.employees.findOne({where: {email: assigned_to[i]}})
    if (bool_at) {
      if (arr[i].companyId !== assigner.companyId || arr[i].managerId !== assigner.employeeId) {
        return false
      }
    } else if (!bool_at) {
      if (arr[i].companyId !== assigner.companyId || arr[i].employeeId !== assigner.managerId) {
        return false
      }
    }
    
  }
  return true
}

module.exports = isManagerOf;