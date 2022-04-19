const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// GET /api/empTasks/ptoRequests?EID=aBigInt
// Passes a json file with the employee's pto requests
function ptoRequests(app){
  app.get('/api/empTasks/ptoRequests', checkLoggedIn, async (req, res) => {
    const pto_requests = await models.pto_request.findAll({
      attributes: ['title', 'description', 'start_date', 'end_date', 'date_created', 'date_due', 'progress', 'approved', 'assigned_to'],
      where: {
        assigned_to: req.user.e_id
      }
    });
    res.json(pto_requests)
  });
}

module.exports = ptoRequests;