const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

/**
 * Passes a json file with the current user's performance reviews, with the following attributes of each:
 *  pr_id, title, overall_comments, growth_feedback (null or [1-5]), kindness_feedback (null or [1-5]), delivery_feedback (null or [1-5]), date_created, date_due, progress (Not-started, To-do, Complete)
 * @param {Express} app  
 * 
 */
function performanceReview(app){
  app.get('/api/empTasks/performanceReviews',
  checkLoggedIn,
  async (req, res) => {
    const performance_reviews = await models.performance_review.findAll({
      attributes: ['pr_id', 'title', 'overall_comments', 'growth_feedback', 'kindness_feedback', 'delivery_feedback', 'date_created', 'date_due', 'progress'],
      where: {
        assigned_to: req.user.e_id
      }
    });
    res.json(performance_reviews)
  });
}

module.exports = performanceReview;