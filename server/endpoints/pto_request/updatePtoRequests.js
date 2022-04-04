const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates pto request with ptoid assigned to employee with eid. Returns number of fields updated (should be 2) or -1 if error.
//                                                                                 progress <- prog,
//                                                                                 approved <- appr
async function updatePTORequest(db, eid, ptoid, prog, appr){
  try{
    return await db.update(
      {progress: prog, approved: appr},
      {where: {
        e_id: eid,
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

// request must have query params EID (employeeId matching training task's e_id), PTOID (task's pto_id), PROGRESS (String: Not-started, To-do, OR Complete), and APPROVED (Boolean)
// /api/empTasks/updatePtoRequest?EID=int&PTOID=int&PROGRESS=string&APPROVED=boolean
// Passes true if updated successfully, false otherwise
function updatePtoRequest(app){
  app.put('/api/empTasks/updatePtoRequest', checkLoggedIn, async (req, res) => {
    res.send((await updatePTORequest(models.pto_request, req.query.EID, req.query.PTOID, req.query.PROGRESS, req.query.APPROVED))[0] === 2);
  });
}

module.exports = updatePtoRequest;