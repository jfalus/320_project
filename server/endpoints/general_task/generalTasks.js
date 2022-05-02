const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

/**
 * Passes a json file with the current user's general tasks
 * @param {Express} app  
 * 
 */
function generalTasks(app){
  app.get('/api/empTasks/generalTasks',
  checkLoggedIn,
  async (req, res) => {
    const general_tasks = await models.general_task.findAll({
      attributes: ['task_id', 'title', 'description', 'date_created', 'date_due', 'progress'],
      where: {
        assigned_to: req.user.e_id
      }
    });
    res.json(general_tasks)
  });
}

module.exports = generalTasks;