const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// GET /api/empTasks/generalTasks?EID=aBigInt
// Passes a json file with the employee's general tasks
function generalTasks(app){
  app.get('/api/empTasks/generalTasks', checkLoggedIn, async (req, res) => {
    const general_tasks = await models.general_task.findAll({
      attributes: ['title', 'description', 'date_created', 'date_due', 'progress', 'assigned_to'],
      where: {
        e_id: req.query.EID
      }
    });
    res.json(general_tasks)
  });
}

module.exports = generalTasks;