const { models } = require('../../sequelize/sequelizeConstructor')
const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');

function isValidAT(e_id, title, desc, link, date_due, assigned_to) {
  let valid = false
  if (e_id !== null && title.length > 0 && desc.length > 0 && link.length > 0 && date_due !== null && assigned_to.length > 0) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/
    const valid_date = regex.test(date_due)
    const check = assigned_to => assigned_to.every(i => (typeof i === 'string'))
    valid = Number.isInteger(e_id) && typeof title === 'string' && typeof desc === 'string' && typeof link === 'string' && valid_date && check(assigned_to)
  }
  return valid
}

function newAssignedTraining(app) {
  app.post('/api/empTasks/newAssignedTraining', checkLoggedIn, async(req,res) => {
    console.log(req.body)
    const e_id = parseInt(req.user.e_id)
    if (isValidAT(e_id, req.body.title, req.body.description, req.body.link, req.body.date_due, req.body.assigned_to)) {
      const arr = []
      for (let i = 0; i < req.body.assigned_to.length; i++) {
        console.log(req.body.assigned_to[i])
        try {
          const emp = await models.employees.findOne({
            where: {email: req.body.assigned_to[i]}
          })
          const assigned_id = parseInt(emp.e_id)
          const bool = await isManagerOf(req.user, assigned_id)
          if (!bool) {
            res.status(400)
            console.log('Error: Violates Employee Hierarchy')
            res.send({Error: 'Violates Employee Hierarchy'});
            break;
          }
          const data = {e_id: e_id, title: req.body.title, description: req.body.description, link: req.body.link, date_due: req.body.date_due, progress: 'Not-started', assigned_to: assigned_id}
          arr[i] = data
        } catch (error) {
          res.status(400)
          console.log('Error: ' + req.body.assigned_to[i] + ' is not a valid email')
          res.send({Error: req.body.assigned_to[i] + ' is not a valid email'})
        }
        
      }
      const x = await models.assigned_training.bulkCreate(arr)
      res.send(arr)
    } else {
      res.status(400)
      console.log('Error: Invalid assigned training, a required field is missing')
      res.send({Error: 'Invalid assigned training, a required field is missing'})
    }
  })
}

module.exports = newAssignedTraining