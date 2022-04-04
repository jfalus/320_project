const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

const SAME = "#SAME";

// Updates performance review with prid assigned to employee with eid. Returns number of fields updated (should be [1-5] if
// called correctly and no error) or -1 if error.                                        progress <- prog,
//                                                                                       growth_feedback <- growth,
//                                                                                       kindness_feedback <- kindness,
//                                                                                       delivery_feedback <- delivery,
//                                                                                       overall_comment <- comments
async function updateReview(db, eid, prid, prog, growth, kindness, delivery, comments){
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
        e_id: eid,
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

// request must have query params EID (employeeId matching training task's e_id) and PRID (task's pr_id)
// request must have at least one of query params PROGRESS (String: Not-started, To-do, OR Complete), GROWTH (int), KINDNESS (int), DELIVERY (int), COMMENTS (String)
// /api/empTasks/updatePerformanceReview?EID=int&PRID=int&PROGRESS=string&GROWTH=int&KINDNESS=int&DELIVERY=int&COMMENT=stringInURLFormat
// Passes true if updated successfully, false otherwise
function updatePerformanceReview(app){
  app.put('/api/empTasks/updatePerformanceReview', checkLoggedIn, async (req, res) => {
    var hit = 0;
    const pars = [SAME, SAME, SAME, SAME, SAME];
    if('PROGRESS' in req.query) {
      hit += 1;
      pars[0] = req.query.PROGRESS;
    }
    if('GROWTH' in req.query) {
      hit += 1;
      pars[1] = req.query.GROWTH;
    }
    if('KINDNESS' in req.query) {
      hit += 1;
      pars[2] = req.query.KINDNESS;
    }
    if('DELIVERY' in req.query) {
      hit += 1;
      pars[3] = req.query.DELIVERY;
    }
    if('COMMENTS' in req.query) {
      hit += 1;
      pars[4] = req.query.COMMENTS;
    }
    if(hit === 0) {
      res.status(500).send({
        message: "Error: No parameters to update task with."
      });
    }
    res.send((await updateReview(models.performance_review, req.query.EID, req.query.PRID, pars[0], pars[1], pars[2], pars[3], pars[4]))[0] === hit);
  });
}

module.exports = updatePerformanceReview;