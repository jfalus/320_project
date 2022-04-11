const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');
const {Op} = require('sequelize');

async function getAllManagedEmployees(db, user, currentManagers){
  try{
                                      // omitted because it queries the database a lot (SLOW)
    const managerIds = currentManagers/*.filter(m => isManager(db, m))*/.map(m => m.employeeId);
    if(managerIds.length === 0) {return [];}
    const managedEmployees = await db.findAll({
        attributes: ['firstName', 'lastName', 'employeeId', 'companyId', 'email', 'positionTitle'/*, 'managerId', 'password'*/],
        where: {
          companyId: user.companyId,
          managerId: {[Op.in]: managerIds},
        }
      });
      //console.log(currentManagers.map(m => m.employeeId) + ":\n" + managedEmployees.map(m => m.employeeId + "@" + m.managerId));
      return managedEmployees.concat(await getAllManagedEmployees(db, user, managedEmployees));
  }catch(error){
    console.log(error);
    return [];
  }
}

function allManagedEmployees(app){
  app.get('/api/allManagedEmployees', 
    //checkLoggedIn,
    async (req, res) => {
      const result = await getAllManagedEmployees(models.employees, req.user, [req.user]);
      res.send(JSON.parse(JSON.stringify(result)));
    }
  );
}

module.exports = allManagedEmployees;