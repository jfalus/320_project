const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

function createAssignedTraining(e_id, title, desc, link, date_due) {
  return models.assigned_training.create({
    e_id: e_id,
    title: title,
    description: desc,
    link: link,
    date_due: date_due,
    progress: 'Not-started',
  })
}

function newAssignedTraining(app){
  app.post('/api/empTasks/newAssignedTraining',
    checkLoggedIn,
    async (req, res) => {
      res.send(
        await createAssignedTraining(
          models.assigned_training,
          req.query.EID,
          req.query.TITLE,
          req.query.DESCRIPTION,
          req.query.LINK,
          req.quqery.DATE_DUE
        )
      )
    }
  );
}

module.exports = newAssignedTraining;