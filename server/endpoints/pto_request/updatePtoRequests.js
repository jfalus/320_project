const checkLoggedIn = require('../authentication/checkLoggedIn');
const {models} = require('../../sequelize/sequelizeConstructor');

// Updates pto request with ptoid. Returns number of fields updated (should be 2) or -1 if error.
//                                                   progress <- prog,
//                                                   approved <- appr
async function updatePTORequest(db, ptoid, prog, appr){
  try{
    return await db.update(
      {progress: prog, approved: appr},
      {where: {
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

// request must have body params pto_id (task's pto_id), progress (String: Not-started, To-do, OR Complete), and approved (Boolean)
// Passes true if updated successfully, false otherwise
function updatePtoRequest(app){
  app.put('/api/empTasks/updatePtoRequest', checkLoggedIn, async (req, res) => {
    res.send((await updatePTORequest(models.pto_request, parseInt(req.body.pto_id), req.body.progress, req.body.approved === "true"))[0] === 2);
  });
}

module.exports = updatePtoRequest;