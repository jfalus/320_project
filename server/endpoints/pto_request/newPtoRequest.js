const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

function createPtoRequest(e_id, title, desc, start_date, end_date, date_due) {
  return models.pto_request.create({
    e_id: e_id,
    title: title,
    description: desc,
    start_date: start_date,
    end_date: end_date,
    date_due: date_due,
    progress: 'Not-started',
    approved: false,
    assigned_to: null,
  })
}

function newPtoRequest(app){
  app.post('/api/empTasks/newPtoRequest', checkLoggedIn, async (req, res) => {
    res.send(
      await createPtoRequest(
        models.pto_request,
        req.query.EID,
        req.query.TITLE,
        req.query.DESCRIPTION,
        req.query.START_DATE,
        req.query.END_DATE,
        req.query.DATE_DUE
      )
    )
  });
}

module.exports = newPtoRequest;