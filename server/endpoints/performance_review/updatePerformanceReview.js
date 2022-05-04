const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

/**
 * Updates performance review with prid of user with eid 
 * Returns number of fields updated 
 * Should be [1-5] if called correctly and no error or -1 if error.   
 * @param {int} eid employee ID
 * @param {int} prid performancfe review ID
 * @param {string} prog progress
 * @param {string} growth employee's growth feedback
 * @param {string} kindness employee's kindness feedback
 * @param {string} delivery employee's delivery feedback
 * @param {string} comments additional comments
 */
async function updateReview(db, eid, prid, prog, growth, kindness, delivery, comments){
  try{
    return await db.update(
      {
        progress: prog,
        growth_feedback: growth,
        kindness_feedback: kindness,
        delivery_feedback: delivery,
        overall_comments: comments
      },
      {where: {
        assigned_to: eid,
        pr_id: prid,
        }
      },
    );
  }
  catch(error){
    console.log(error);
    return -1;
  }
}

const PROGRESSES = ["Not-started", "To-do", "Complete"];

/**
 * Updates a performance review assigned to the current user
 * request must have body param pr_id (task's pr_id), creator (e_id of creator of PTO Request), progress (String: Not-started, To-do, OR Complete), growth (int), kindness (int), delivery (int), and comments (String)
 * If successfully updated and finished, sends a notification to the original creator in the form of a General Task.
 * Passes true if updated successfully, false otherwise
 */
function updatePerformanceReview(app){
  app.put('/api/empTasks/updatePerformanceReview', checkLoggedIn, async (req, res) => {
    var hit = 0;
    var flunked = false;
    if('pr_id' in req.body) { hit += 1; }
    if('creator' in req.body) { hit += 1; }
    if('progress' in req.body)
    {
      if(!PROGRESSES.includes(req.body.progress)) {flunked = true;}
      hit += 1;
    }
    if('growth' in req.body) { hit += 1; }
    if('kindness' in req.body) { hit += 1; }
    if('delivery' in req.body) { hit += 1; }
    if('comments' in req.body) { hit += 1; }
    else if(!models.employees.findOne({attributes: ['e_id'], where: {e_id: parseInt(req.body.creator), companyId: parseInt(req.user.companyId)}}))
    {
      res.status(500).send({
        message: "Error: Creator and recipient of Performance Review request not in same company."
      });
    }
    else if(hit < 7) {
      res.status(500).send({
        message: "Error: Not enough body parameters."
      });
    }
    else if(flunked)
    {
      res.status(500).send({
        message: "Error: Invalid progress String."
      });
    }
    else
    {
      const succ = await updateReview(models.performance_review, req.user.e_id, parseInt(req.body.pr_id), req.body.progress, parseInt(req.body.growth), parseInt(req.body.kindness), parseInt(req.body.delivery), req.body.comments)[0] === 5;
      if(succ)
      {
        data = "";
        data += "Growth Feedback: " + req.body.growth + " / 5\n";
        data += "Kindness Feedback: " + req.body.kindness + " / 5\n";
        data += "Delivery Feedback: " + req.body.delivery + " / 5\n";
        data += "Overall Comments:\n" + req.body.comments;
        models.general_task.create({
          e_id: parseInt(req.user.e_id),
          title: 'Performance Review Completed', 
          description: 'Your performance review that you requested from ' + req.user.firstName + ' ' + req.user.lastName + ' has been completed:\n' + data,
          date_due: today,
          progress: "Not-Started",
          assigned_to: parseInt(req.body.creator)
        })
      }
      res.send(succ);
    }
  });
}

module.exports = updatePerformanceReview;