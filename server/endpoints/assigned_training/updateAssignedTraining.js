const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates assigned training with atid. Returns number of fields updated (should be 1) or
// -1 if error.                                           progress <- prog
async function updateTraining(db, atid, prog){
  try{
    return await db.update(
      {progress: prog},
      {where: {
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

// request must have body params at_id (task's at_id), and progress (String: Not-started, To-do, OR Complete)
// Passes true if updated successfully, false otherwise
function updateAssignedTraining(app){
  app.put('/api/empTasks/updateAssignedTraining',
  checkLoggedIn,
  async (req, res) => {
    if(!(req.user.e_id === req.query.EID || isManagerOf(req.user.e_id, req.query.EID))){
      return res.json({Error:"No permission"});
    }
    res.send((await updateTraining(models.assigned_training, parseInt(req.body.at_id), req.body.progress))[0] === 1);
  });                                                                                                         // Sequelize update returns array,
}

module.exports = updateAssignedTraining;