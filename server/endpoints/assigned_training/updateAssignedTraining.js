const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates assigned training with atid of user with eid. Returns number of fields updated (should be 1) or
// -1 if error.                                                            progress <- prog
async function updateTraining(db, eid, atid, prog){
  try{
    return await db.update(
      {progress: prog},
      {where: {
        assigned_to: eid,
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

const PROGRESSES = ["Not-started", "To-do", "Complete"];

// Updates an assigned training assigned to current user
// request must have body params at_id (BigInt: task's at_id), and progress (String: Not-started, To-do, OR Complete)
// Passes true if updated successfully, false otherwise
function updateAssignedTraining(app){
  app.put('/api/empTasks/updateAssignedTraining',
  checkLoggedIn,
  async (req, res) => {
    var hit = 0;
    var flunked = false;
    if('at_id' in req.body) { hit += 1; }
    if('progress' in req.body)
    {
      if(!PROGRESSES.includes(req.body.progress)) {flunked = true;}
      hit += 1;
    }

    if(hit < 2) {
      res.status(500).send({
        message: "Error: Not enough parameters."
      });
    }
    else if(flunked)
    {
      res.status(500).send({
        message: "Error: Invalid progress String."
      });
    }
    else {res.send((await updateTraining(models.assigned_training, req.user.e_id, parseInt(req.body.at_id), req.body.progress))[0] === 1);}
  });                                                                                                                          // Sequelize update returns array,
}

module.exports = updateAssignedTraining;