const checkLoggedIn = require("../authentication/checkLoggedIn");
const { models } = require("../../sequelize/sequelizeConstructor");

async function getManager(db, user) {
  try {
    return await db.findOne({
      attributes: { exclude: ["password"] },
      where: {
        companyId: user.companyId,
        employeeId: user.managerId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

function manager(app) {
  app.get("/api/manager", checkLoggedIn, async (req, res) => {
    const result = await getManager(models.employees, req.user);
    res.send(JSON.parse(JSON.stringify(result)));
  });
}

function allManagers(app) {
  app.get("/api/allManagers", checkLoggedIn, async (req, res) => {
    let listOfManagers = []
    let result = 0
    let curUser = req.user
    while(result !== null){
      const result = await getManager(models.employees, curUser);
      if(result !== null){
        listOfManagers.push(result)
        if(result.managerId !== null){
          curUser = {companyId: user.companyId, employeeId: result.managerId}
        }else{
          break
        }
      }
    }
    res.send(JSON.parse(JSON.stringify(listOfManagers)));
  });
}

module.exports = {getManager, manager, allManagers};
