const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const { models } = require('../../sequelize/sequelizeConstructor')

function isValidAT(e_id, title, desc, link, date_due) {
  let valid = false
  if (e_id !== null && title !== null && desc !== null && link !== null && date_due !== null) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/
    const valid_date = regex.test(date_due)
    valid = Number.isInteger(e_id) && typeof title === 'string' && typeof desc === 'string' && typeof link === 'string' && valid_date
  }
  return valid
}

function newAssignedTraining(app) {
  app.post('/api/empTasks/newAssignedTraining',
  checkLoggedIn,
  async(req,res) => {
    if(!isManagerOf(req.user.e_id, req.body.e_id)){
      return res.json({Error:"No permission"});
    }
    if (isValidAT(req.body.e_id, req.body.title, req.body.description, req.body.link, req.body.date_due)) {
      const data = {e_id: req.body.e_id, title: req.body.title, description: req.body.description, link: req.body.link, date_due: req.body.date_due, progress: 'Not-started'}
      const x = await models.assigned_training.create(data)
      console.log(x.toJSON())
      res.send(x.toJSON())
    } else {
      res.status(400)
      res.send({Error: 'Invalid assigned training'})
    }
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