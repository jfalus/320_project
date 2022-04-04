const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

async function getDirectManagedEmployees(db, user){
  try{
    if(user.isManager){
      return await db.findAll({
        attributes: ['firstName', 'lastName', 'employeeId', 'companyId', 'email', 'positionTitle'],
        where: {
          companyId: user.companyId,
          managerId: user.employeeId,
        }
      });
    }
    return [];
  }catch(error){
    console.log(error);
    return [];
  }
}

function directManagedEmployees(app){
  app.get('/api/directManagedEmployees', 
    checkLoggedIn,
    async (req, res) => {
      const result = await getDirectManagedEmployees(models.employees, req.user);
      res.send(JSON.parse(JSON.stringify(result)));
    }
  );
}

module.exports = directManagedEmployees;