const { models } = require("../../sequelize/sequelizeConstructor");
const checkLoggedIn = require("../authentication/checkLoggedIn");
const isManagedBy = require("../employee/isManagedBy");

function isValidPto(
  e_id,
  title,
  desc,
  start_date,
  end_date,
  date_due,
  assigned_to
) {
  let valid = false;
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    start_date !== null &&
    end_date !== null &&
    date_due !== null &&
    assigned_to.length > 0
  ) {
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/;
    const valid_start_date = regex.test(start_date);
    const valid_end_date = regex.test(end_date);
    const valid_date = regex.test(date_due);
    const check = (assigned_to) =>
      assigned_to.every((i) => typeof i === "string");
    valid =
      Number.isInteger(e_id) &&
      typeof title === "string" &&
      typeof desc === "string" &&
      valid_start_date &&
      valid_end_date &&
      valid_date &&
      check(assigned_to);
  }
  return valid;
}

function newPtoRequest(app) {
  app.post("/api/empTasks/newPtoRequest", checkLoggedIn, async (req, res) => {
    console.log(req.body);
    const e_id = parseInt(req.user.e_id);
    if (
      isValidPto(
        e_id,
        req.body.title,
        req.body.description,
        req.body.start_date,
        req.body.end_date,
        req.body.date_due,
        req.body.assigned_to
      )
    ) {
      const arr = [];
      for (let i = 0; i < req.body.assigned_to.length; i++) {
        console.log(req.body.assigned_to[i]);
        const emp = await models.employees.findOne({
          where: { email: req.body.assigned_to[i] },
        });
        const assigned_id = parseInt(emp.e_id);
        const bool = await isManagedBy(req.user, assigned_id);
        console.log(bool);
        if (!bool) {
          res.status(400);
          res.send({ Error: "No Permission" });
          break;
        }
        const data = {
          e_id: e_id,
          title: req.body.title,
          description: req.body.description,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          date_due: req.body.date_due,
          progress: "Not-started",
          approved: null,
          assigned_to: assigned_id,
        };
        arr[i] = data;
      }
      const x = await models.pto_request.bulkCreate(arr);
      res.send(arr);
    } else {
      res.status(400);
      res.send({ Error: "Invalid PTO request" });
    }
  });
}

module.exports = newPtoRequest;
