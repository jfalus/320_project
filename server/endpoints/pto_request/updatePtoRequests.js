const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates pto request with ptoid of user with eid. Returns number of fields updated (should be 2) or -1 if error.
//                                                                    progress <- prog,
//                                                                    approved <- appr
async function updatePTORequest(db, eid, ptoid, prog, appr){
  try{
    return await db.update(
      {progress: prog, approved: appr},
      {where: {
        assigned_to: eid,
        pto_id: ptoid,
        }
      },
    );
  }
  catch(error){
    console.log(error);
    return -1;
  }
}

// Updates a PTO Request assigned to the current user
// Request must have body params pto_id (task's pto_id), progress (String: Not-started, To-do, OR Complete), approved (Boolean), creator (employeeId of creator), start_date (Date), and end_date (date)
// Passes true if updated successfully, false otherwise
function updatePtoRequest(app){
  app.put('/api/empTasks/updatePtoRequest',
  checkLoggedIn,
  async (req, res) => {
    var hit = 0;
    var flunked = false;
    if('pto_id' in req.body) { hit += 1; }
    if('progress' in req.body)
    {
      if(!(req.body.progress === "Completed")) {flunked = true;}
      hit += 1;
    }
    if('approved' in req.body) { hit += 1; }
    if('creator' in req.body)  { hit += 1; }
    if('start_date' in req.body) { hit += 1; }
    if('end_date' in req.body) { hit += 1; }

    if(hit < 6) {
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
      const succ = (await updatePTORequest(models.pto_request, req.user.e_id, parseInt(req.body.pto_id), req.body.progress, req.body.approved === "true"))[0] === 2;
      if(succ)
      {
        var not = "";
        if(!(req.body.approved === "true")){not = 'not ';}
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
          // Date formatting taken from StackOverflow
        models.general_task.create({
          e_id: req.user.employeeId,
          title: 'PTO Request Updated', 
          description: 'Your PTO request for ' + req.body.start_date + ' to ' + req.body.end_date + ' has ' + not + 'been approved.',
          date_due: today,
          progress: "Complete",
          assigned_to: req.body.creator
        })
      }
      res.send(succ);
    }
  });
}

module.exports = updatePtoRequest;