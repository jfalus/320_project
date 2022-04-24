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

const PROGRESSES = ["Not-started", "To-do", "Complete"];

// Updates a PTO Request assigned to the current user
// request must have body params pto_id (task's pto_id), progress (String: Not-started, To-do, OR Complete), and approved (Boolean)
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
      if(!PROGRESSES.includes(req.body.progress)) {flunked = true;}
      hit += 1;
    }
    if('approved' in req.body) { hit += 1; }

    if(hit < 3) {
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
    else {res.send((await updatePTORequest(models.pto_request, req.user.e_id, parseInt(req.body.pto_id), req.body.progress, req.body.approved === "true"))[0] === 2);}
  });
}

module.exports = updatePtoRequest;