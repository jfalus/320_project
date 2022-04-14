const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// GET /api/empTasks/generalTasks?ASTO=aBigInt
// Passes a json file with the employee's general tasks
function generalTasks(app){
  app.get('/api/empTasks/generalTasks',
  checkLoggedIn,
  async (req, res) => {
    const general_tasks = await models.general_task.findAll({
      attributes: ['task_id', 'title', 'description', 'date_created', 'date_due', 'progress', 'assigned_to'],
      where: {
        assigned_to: req.query.ASTO
      }
    });
    res.json(general_tasks)
  });
}

module.exports = generalTasks;