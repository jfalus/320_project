const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// GET /api/empTasks/PerformanceReviews?EID=aBigInt
// Passes a json file with the employee's performance reviews
function performanceReview(app){
  app.get('/api/empTasks/performanceReviews',
  //checkLoggedIn,
  async (req, res) => {
    const performance_reviews = await models.performance_review.findAll({
      attributes: ['title', 'overall_comments', 'growth_feedback', 'kindness_feedback', 'delivery_feedback', 'date_created', 'date_due', 'progress', 'assigned_to'],
      where: {
        e_id: req.query.EID
      }
    });
    res.json(performance_reviews)
  });
}

module.exports = performanceReview;