const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const {models} = require('../../sequelize/sequelizeConstructor');

/**
 * Passes a json file with the current user's pto requests
 * @param {Express} app  
 * 
 */
function ptoRequests(app){
  app.get('/api/empTasks/ptoRequests',
  checkLoggedIn,
  async (req, res) => {
    const pto_requests = await models.pto_request.findAll({
      attributes: ['pto_id', 'title', 'description', 'start_date', 'end_date', 'date_created', 'date_due', 'progress', 'approved', 'e_id'],
      where: {
        assigned_to: req.user.e_id
      }
    });
    res.json(pto_requests)
  });
}

module.exports = ptoRequests;