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
  app.post('/api/findSelf', 
    checkLoggedIn,
    async (req, res) => {
      res.send(req.user.employeeId);
    }
  );
}

module.exports = findEmployee;