const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

function createPerformanceReview(e_id, title, assigned_to, date_due) {
  return models.performance_review.create({
    e_id: e_id,
    title: title,
    overall_comments: null,
    growth_feedback: 0,
    kindness_feedback: 0,
    delivery_feedback: 0,
    date_due: date_due,
    progress: 'Not-started',
    assigned_to: assigned_to,
  })
}

function newPerformanceReview(app){
  app.post('/api/empTasks/newPerformanceReview',
    checkLoggedIn,
    async (req, res) => {
      res.send(
        await createPerformanceReview(
          models.performance_review,
          req.query.EID,
          req.query.TITLE,
          req.query.assigned_to,
          req.query.DATE_DUE
        )
      )
    }
  );
}

module.exports = newPerformanceReview;