const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const {models} = require('../../sequelize/sequelizeConstructor');

/**
 * Passes a json file with the current user's assigned trainings, with the following attributes of each:
 *  at_id, title, description, link (link to external training), date_created, date_due, progress (Not-started, To-do, Complete)
 * @param {Express} app  
 * 
 */
function assignedTrainings(app){
  app.get('/api/empTasks/assignedTrainings',
  checkLoggedIn,
  async (req, res) => {
    const assigned_trainings = await models.assigned_training.findAll({
      attributes: ['at_id', 'title', 'description', 'link', 'date_created', 'date_due', 'progress'],
      where: {
        assigned_to: req.user.e_id
      }
    });
    res.json(assigned_trainings)
  });
}

module.exports = assignedTrainings;