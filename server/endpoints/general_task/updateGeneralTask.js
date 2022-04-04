const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates general task with taskid assigned to employee with eid. Returns number of fields updated (should be 2) or
// -1 if error.                                                                      progress <- prog,
//                                                                                   description <- desc
async function updateTask(db, eid, taskid, prog, desc){
  try{
    return await db.update(
      {progress: prog, description: desc},
      {where: {
        e_id: eid,
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

// request must have query params EID (employeeId matching training task's e_id), TASKID (task's task_id), PROGRESS (String: Not-started, To-do, OR Complete), and DESCRIPTION (String)
// /api/empTasks/updateGeneralTask?EID=int&TASKID=int&PROGRESS=string&DESCRIPTION=stringInURLFormat
// Passes true if updated successfully, false otherwise
function updateGeneralTask(app){
  app.put('/api/empTasks/updateGeneralTask', checkLoggedIn, async (req, res) => {
    res.send((await updateTask(models.general_task, req.query.EID, req.query.TASKID, req.query.PROGRESS, req.query.DESCRIPTION))[0] === 2);
  });
}

module.exports = updateGeneralTask;