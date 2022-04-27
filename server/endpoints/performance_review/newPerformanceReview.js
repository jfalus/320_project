const {models} = require('../../sequelize/sequelizeConstructor');
const checkLoggedIn = require('../authentication/checkLoggedIn');

function isValidPR(e_id, title, assigned_to, date_due) {
  let valid = false
  if (e_id !== null && title.length > 0 && assigned_to.length > 0 && date_due !== null) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/
    const valid_date = regex.test(date_due)
    const check = assigned_to => assigned_to.every(i => (typeof i === 'string'))
    valid = Number.isInteger(e_id) && typeof title === 'string' && check(assigned_to) && valid_date
  }
  return valid
}

function newPerformanceReview(app){
  app.post('/api/empTasks/newPerformanceReview', checkLoggedIn, async(req,res) => {
    console.log(req.body)
    const e_id = parseInt(req.user.e_id)
    if (isValidPR(e_id, req.body.title, req.body.assigned_to, req.body.date_due)) {
      const arr = []
      for (let i = 0; i < req.body.assigned_to.length; i++) {
        console.log(req.body.assigned_to[i])
        try {
          const emp = await models.employees.findOne({
            where: {email: req.body.assigned_to[i]}
          })
          const assigned_id = parseInt(emp.e_id)
          const data = {e_id: e_id, title: req.body.title, overall_comments: null, growth_feedback: null, kindness_feedback: null, delivery_feedback: null,  date_due: req.body.date_due, progress: 'Not-started', assigned_to: assigned_id}
          console.log(data)
          const x = await models.performance_review.create(data)
          arr[i] = x.toJSON()
        } catch (error) {
          res.status(400)
          console.log('Error: ' + req.body.assigned_to[i] + ' is not a valid email')
          res.send({Error: req.body.assigned_to[i] + ' is not a valid email'})
        }
      }
      res.send(arr)
    } else {
      res.status(400)
      console.log('Error: Invalid Performance Review, a required field is missing')
      res.send({Error: 'Invalid Performance Review, a required field is missing'})
    }
  })
}

module.exports = newPerformanceReview;