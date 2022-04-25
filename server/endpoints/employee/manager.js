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

module.exports = { getManager, manager };
