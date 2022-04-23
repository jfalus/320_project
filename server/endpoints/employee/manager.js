const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');


async function getManager(managerId, companyId){
  try{
    return await models.employees.findOne({
      attributes: ['e_id', 'firstName', 'lastName', 'employeeId', 'companyId', 'email', 'positionTitle'],
      where: {
        companyId: companyId,
        employeeId: managerId
      }
    });
  }catch(error){
    console.log(error);
    return null;
  }
}

function manager(app){
  app.get('/api/manager', 
    checkLoggedIn,
    async (req, res) => {
      const result = await getManager(req.user.managerId, req.user.companyId);
      res.send(JSON.parse(JSON.stringify(result)));
    }
  );
}

module.exports = {getManager, manager};