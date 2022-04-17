const {models} = require('../../sequelize/sequelizeConstructor');

function isValidPto(e_id, title, desc, start_date, end_date, date_due, assigned_to) {
  let valid = false
  if (e_id !== null && title !== null && desc !== null && start_date !== null && end_date !== null && date_due !== null) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/
    const valid_start_date = regex.test(start_date)
    const valid_end_date = regex.test(end_date)
    const valid_date = regex.test(date_due)

    valid = Number.isInteger(e_id) && typeof title === 'string' && typeof desc === 'string' && valid_start_date && valid_end_date && valid_date && Number.isInteger(assigned_to)
  }
  return valid
}

//this needs fixing idk why this does not work unless I pass through ALL the fields
function newPtoRequest(app){
  app.post('/api/empTasks/newPtoRequest', async(req,res) => {
    console.log(req.body)
    if (isValidPto(req.body.e_id, req.body.title, req.body.description, req.body.start_date, req.body.end_date, req.body.date_due, req.body.assigned_to)) {
      const data = {e_id: req.body.e_id, title: req.body.title, description: req.body.description, start_date: req.body.start_date, end_date: req.body.end_date, date_due: req.body.date_due, progress: "Not-started", approved: null, assigned_to: req.body.assigned_to}
      const x = await models.pto_request.create(data)
      console.log(x.toJSON())
      res.send(x.toJSON())
    } else {
      res.status(400)
      res.send({Error: 'Invalid PTO request'})
    }
  })
}

module.exports = newPtoRequest;
