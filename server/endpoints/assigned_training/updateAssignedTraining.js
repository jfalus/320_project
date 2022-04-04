const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates assigned training with atid assigned to employee with eid. Returns number of fields updated (should be 1) or
// -1 if error.                                                                         progress <- prog
async function updateTraining(db, eid, atid, prog){
  try{
    return await db.update(
      {progress: prog},
      {where: {
        e_id: eid,
        at_id: atid,
        }
      },
    );
  }
  catch(error){
    console.log(error);
    return -1;
  }
}

// request must have query params EID (employeeId matching training task's e_id), ATID (task's at_id), and PROGRESS (String: Not-started, To-do, OR Complete)
// /api/empTasks/updateAssignedTraining?EID=int&ATID=int&PROGRESS=string
// Passes true if updated successfully, false otherwise
function updateAssignedTraining(app){
  app.put('/api/empTasks/updateAssignedTraining', checkLoggedIn, async (req, res) => {
    res.send((await updateTraining(models.assigned_training, req.query.EID, req.query.ATID, req.query.PROGRESS))[0] === 1);
  });                                                                                                         // Sequelize update returns array,
                                                                                                            // first element is number of updated values
}

module.exports = updateAssignedTraining;