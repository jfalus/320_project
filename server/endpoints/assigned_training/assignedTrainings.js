const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const {models} = require('../../sequelize/sequelizeConstructor');
/* NEED TO DECIDE WHO CAN VIEW/EDIT WHOSE TASKS */

// GET /api/empTasks/assignedTrainings
// Passes a json file with the employee's assigned trainings
function assignedTrainings(app){
  app.get('/api/empTasks/assignedTrainings',
  checkLoggedIn,
  async (req, res) => {
    const assigned_trainings = await models.assigned_training.findAll({
      attributes: ['at_id', 'title', 'description', 'link', 'date_created', 'date_due', 'progress', 'assigned_to'],
      where: {
        assigned_to: req.user.e_id
      }
    });
    res.json(assigned_trainings)
  });
}

module.exports = assignedTrainings;