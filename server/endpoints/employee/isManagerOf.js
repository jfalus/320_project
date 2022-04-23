const {findEmployeeById} = require('./findEmployee');

//req is manager of e_id?
async function isManagerOf(manager_employeeId, employeeId, companyId){
  while(employeeId != null){
    const employee = await findEmployeeById({companyId:companyId}, {employeeId:employeeId})
    if(!employee){
      return false
    }
    const manager = employee.managerId;
    if(manager == manager_employeeId){
      return true
    }
    employeeId = manager
  }
  return false
}

module.exports = isManagerOf;