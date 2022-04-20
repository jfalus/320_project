const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

const SAME = "#SAME";

// Updates general task with taskid. Returns number of fields updated (should be 1 or 2) or
// -1 if error.                                        progress <- prog,
//                                                     description <- desc
async function updateTask(db, taskid, prog, desc){
  try{
    up = {};
    if(prog !== SAME) {up.progress = prog;}
    if(desc !== SAME) {up.description = desc;}
    return await db.update(
      up,
      {where: {
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

// request must have body param task_id (task's task_id)
// request must have one or both of body params progress (String: Not-started, To-do, OR Complete) and/or description (String)
// Passes true if updated successfully, false otherwise
function updateGeneralTask(app){
  app.put('/api/empTasks/updateGeneralTask', checkLoggedIn, async (req, res) => {
    var hit = 0;
    const pars = [SAME, SAME];
    if('progress' in req.body)
    {
      hit += 1;
      pars[0] = req.body.progress;
    }
    if('description' in req.body)
    {
      hit += 1;
      pars[1] = req.body.description;
    }

    if(hit === 0)
    {
      res.status(500).send({
        message: "Error: No parameters to update task with."
      });
    }
    else {res.send((await updateTask(models.general_task, parseInt(req.body.task_id), pars[0], pars[1]))[0] === hit);}
  });
}

module.exports = updateGeneralTask;