const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

async function employeeByEmail(user, body){
  return await models.employees.findOne({
    attributes: ['e_id', 'firstName', 'lastName', 'employeeId', 'companyId', 'managerId', 'email', 'positionTitle'],
    where: {
      companyId: user.companyId,
      email: body.email
    }
  })
}

async function employeeById(user, body){
  return await models.employees.findOne({
    attributes: ['e_id', 'firstName', 'lastName', 'employeeId', 'companyId', 'managerId', 'email', 'positionTitle'],
    where: {
      companyId: user.companyId,
      employeeId: body.employeeId
    }
  })
}

//finds using email
function findEmployeeByEmail(app){
  app.post('/api/findEmployeeByEmail', 
    checkLoggedIn,
    async (req, res) => {
      const result = await employeeByEmail(req.user, req.body);
      res.send(JSON.parse(JSON.stringify(result)));
    }
  );
}

//finds using employeeId
function findEmployeeById(app){
  app.post('/api/findEmployeeById', 
    checkLoggedIn,
    async (req, res) => {
      const result = await employeeById(req.user, req.body);
      res.send(JSON.parse(JSON.stringify(result)));
    }
  );
}

module.exports = {findEmployeeByEmail, findEmployeeById};