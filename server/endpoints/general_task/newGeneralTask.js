const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

function createGeneralTask(e_id, title, desc, date_due) {
  return models.general_task.create({
    e_id: e_id,
    title: title,
    description: desc,
    date_due: date_due,
    progress: 'Not-started',
    assigned_to: null,
  })
}

function newGeneralTask(app){
  app.post('/api/empTasks/newGeneralTask', checkLoggedIn, async (req, res) => {
    res.send(
      await createGeneralTask(
        models.general_task,
        req.query.EID,
        req.query.TITLE,
        req.query.DESCRIPTION,
        req.query.DATE_DUE
      )
    )
  });
}

module.exports = newGeneralTask;