const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

const SAME = "#SAME";

/**
 * general function to update task
 * @param {int} eid employee ID
 * @param {int} taskid task ID
 * @param {string} prog progress
 * @param {string} desc description
 */
async function updateTask(db, eid, taskid, prog, desc){
  try{
    up = {};
    if(prog !== SAME) {up.progress = prog;}
    if(desc !== SAME) {up.description = desc;}
    return await db.update(
      up,
      {where: {
        assigned_to: eid,
        task_id: taskid,
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
 * Updates a general task assigned to current user
 * request must have body param task_id (BigInt: task's task_id)
 * request must have one or both of body params progress (String: Not-started, To-do, OR Complete) and/or description (String)
 * Passes true if updated successfully, false otherwise
 * @param {Express} app
 */
function updateGeneralTask(app){
  app.put('/api/empTasks/updateGeneralTask', checkLoggedIn, async (req, res) => {
    var t_in = false;
    var hit = 0;
    const pars = [SAME, SAME];
    var flunked = false;
    if('task_id' in req.body) { t_in = true; }
    if('progress' in req.body)
    {
      if(!PROGRESSES.includes(req.body.progress)) {flunked = true;}
      hit += 1;
      pars[0] = req.body.progress;
    }
    if('description' in req.body)
    {
      hit += 1;
      pars[1] = req.body.description;
    }

    if(!t_in)
    {
      res.status(500).send({
        message: "Error: No task_id"
      });
    }
    else if(hit === 0)
    {
      res.status(500).send({
        message: "Error: No parameters to update task with."
      });
    }
    else if(flunked)
    {
      res.status(500).send({
        message: "Error: Invalid progress String."
      });
    }
    else {res.send((await updateTask(models.general_task, req.user.e_id, parseInt(req.body.task_id), pars[0], pars[1]))[0] === hit);}
  });
}

module.exports = updateGeneralTask;