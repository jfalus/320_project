const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

async function employee(db, user, body){
  return await db.findOne({
    attributes: ['firstName', 'lastName', 'employeeId', 'companyId', 'email', 'positionTitle'],
    where: {
      companyId: user.companyId,
      email: body.email
    }
  })
}

//finds using email
function findEmployee(app){
  app.post('/api/findEmployee', 
    checkLoggedIn,
    async (req, res) => {
      const result = await employee(models.employees, req.user, req.body);
      res.send(JSON.parse(JSON.stringify(result)));
    }
  );
}

module.exports = findEmployee;