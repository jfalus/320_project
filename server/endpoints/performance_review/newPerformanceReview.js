const {models} = require('../../sequelize/sequelizeConstructor');

function isValidPR(e_id, title, assigned_to, date_due) {
  let valid = false
  if (e_id !== null && title !== null && assigned_to !== null && date_due !== null) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/
    const valid_date = regex.test(date_due)
    valid = Number.isInteger(e_id) && typeof title === 'string' && Number.isInteger(assigned_to) && valid_date
  }
  return valid
}

function newPerformanceReview(app){
  app.post('/api/empTasks/newPerformanceReview', async(req,res) => {
    console.log(req.body)
    if (isValidPR(req.body.e_id, req.body.title, req.body.assigned_to, req.body.date_due)) {
      const data = {e_id: req.body.e_id, title: req.body.title, overall_comments: null, growth_feedback: null, kindness_feedback: null, delivery_feedback: null,  date_due: req.body.date_due, progress: 'Not-started', assigned_to: req.body.assigned_to}
      const x = await models.performance_review.create(data)
      console.log(x.toJSON())
      res.send(x.toJSON())
    } else {
      res.status(400)
      res.send({Error: 'Invalid Performance Review'})
    }
  })
}

module.exports = newPerformanceReview;