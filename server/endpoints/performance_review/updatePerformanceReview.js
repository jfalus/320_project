const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

const SAME = "#SAME";

// Updates performance review with prid. Returns number of fields updated (should be [1-5] if called correctly and no error) or
// -1 if error.                                            progress <- prog,
//                                                         growth_feedback <- growth,
//                                                         kindness_feedback <- kindness,
//                                                         delivery_feedback <- delivery,
//                                                         overall_comment <- comments
async function updateReview(db, prid, prog, growth, kindness, delivery, comments){
  try{
    up = {};
    if(prog !== SAME) {up.progress = prog;}
    if(growth !== SAME) {up.growth_feedback = growth;}
    if(kindness !== SAME) {up.kindness_feedback = kindness;}
    if(delivery !== SAME) {up.delivery_feedback = delivery;}
    if(comments !== SAME) {up.overall_comments = comments;}
    return await db.update(
      up,
      {where: {
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

// request must have body param pr_id (task's pr_id)
// request must have at least one of body params progress (String: Not-started, To-do, OR Complete), growth (int), kindness (int), delivery (int), and/or comments (String)
// Passes true if updated successfully, false otherwise
function updatePerformanceReview(app){
  app.put('/api/empTasks/updatePerformanceReview', checkLoggedIn, async (req, res) => {
    var hit = 0;
    const pars = [SAME, SAME, SAME, SAME, SAME];
    if('progress' in req.body) {
      hit += 1;
      pars[0] = req.body.progress;
    }
    if('growth' in req.body) {
      hit += 1;
      pars[1] = parseInt(req.body.growth);
    }
    if('kindness' in req.body) {
      hit += 1;
      pars[2] = parseInt(req.body.kindness);
    }
    if('delivery' in req.body) {
      hit += 1;
      pars[3] = parseInt(req.body.delivery);
    }
    if('comments' in req.body) {
      hit += 1;
      pars[4] = req.body.comments;
    }

    if(hit === 0) {
      res.status(500).send({
        message: "Error: No parameters to update task with."
      });
    }
    else {res.send((await updateReview(models.performance_review, parseInt(req.body.pr_id), pars[0], pars[1], pars[2], pars[3], pars[4]))[0] === hit);}
  });
}

module.exports = updatePerformanceReview;