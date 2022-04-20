const { models } = require("../../sequelize/sequelizeConstructor");

function isValidGT(e_id, title, desc, assigned_to, date_due) {
  let valid = false;
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    assigned_to !== null &&
    date_due !== null
  ) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/;
    const valid_date = regex.test(date_due);
    valid =
      Number.isInteger(e_id) &&
      typeof title === "string" &&
      typeof desc === "string" &&
      Number.isInteger(assigned_to) &&
      valid_date;
  }
  return valid;
}

function newGeneralTask(app) {
  app.post("/api/empTasks/newGeneralTask", async (req, res) => {
    console.log(req.body);
    if (
      isValidGT(
        req.body.e_id,
        req.body.title,
        req.body.description,
        req.body.assigned_to,
        req.body.date_due
      )
    ) {
      const data = {
        e_id: req.body.e_id,
        title: req.body.title,
        description: req.body.description,
        date_due: req.body.date_due,
        progress: "Not-started",
        assigned_to: req.body.assigned_to,
      };
      const x = await models.general_task.create(data);
      console.log(x.toJSON());
      res.send(x.toJSON());
    } else {
      res.status(400);
      res.send({ Error: "Invalid general task" });
    }
  });
}

module.exports = newGeneralTask;
