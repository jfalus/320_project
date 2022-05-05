const { models } = require("../../sequelize/sequelizeConstructor");
const checkLoggedIn = require("../authentication/checkLoggedIn");
const isManagedBy = require("../employee/isManagedBy");

/**
 * Checks if assigned training is valid by checking if the necessary fields are sent as needed
 * @param {int} e_id employee ID
 * @param {string} title title of training
 * @param {string} desc description
 * @param {string} start_date date indicating the start of the PTO
 * @param {string} end_date date indicating the end of the PTO
 * @param {string} date_due due date of PTO request
 * @param {Array.<string>} assigned_to employee email(s) of who the PTO Request is assigned to
 *
 */
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
    title.length > 0 &&
    desc.length > 0 &&
    start_date !== null &&
    end_date !== null &&
    date_due !== null &&
    assigned_to.length > 0
  ) {
    //first checks that no empty values were given
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/; //checks if the date was formatted correctly when given
    const valid_start_date = regex.test(start_date);
    const valid_end_date = regex.test(end_date);
    const valid_date = regex.test(date_due);
    const check = (assigned_to) =>
      assigned_to.every((i) => typeof i === "string"); //checks if the assigned_to array is an array of strings
    valid =
      Number.isInteger(e_id) &&
      typeof title === "string" &&
      typeof desc === "string" &&
      valid_start_date &&
      valid_end_date &&
      valid_date &&
      check(assigned_to);
  }
  return valid; //returns true if valid entry and false if not a valid entry
}

/**
 * Creates new pto request
 * @param {Express} app
 */
function newPtoRequest(app) {
  app.post("/api/empTasks/newPtoRequest", checkLoggedIn, async (req, res) => {
    console.log(req.body);
    const e_id = parseInt(req.user.e_id); //parses user e_id into an integer
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
      //check the validity of the data given
      const arr = [];
      for (let i = 0; i < req.body.assigned_to.length; i++) {
        //loop through the emails given in assigned_to
        console.log(req.body.assigned_to[i]);
        try {
          //try to find if the employee with the email can be found
          const emp = await models.employees.findOne({
            where: { email: req.body.assigned_to[i] },
          });
          const assigned_id = parseInt(emp.e_id); //if found, parse the e_id of the employee
          const bool = await isManagedBy(req.user, assigned_id); //check if the user is managed by the assignee
          console.log(bool);
          if (!bool) {
            //if bool is false, sends an error to the user as they violated the employee hierarchy
            res.status(400);
            console.log("Error: Violates Employee Hierarchy");
            res.send({ Error: "Violates Employee Hierarchy" });
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
          arr[i] = data; //otherwise, the data is logged
        } catch (error) {
          //send an error to the user if an assignee could not be found in the database
          res.status(400);
          console.log(
            "Error: " + req.body.assigned_to[i] + " is not a valid email"
          );
          res.send({
            Error: req.body.assigned_to[i] + " is not a valid email",
          });
        }
      }
      const x = await models.pto_request.bulkCreate(arr); //create the request if valid, found, and managedby
      res.send(arr);
    } else {
      //if data is not valid, sends error to the user
      res.status(400);
      console.log("Error: Invalid PTO Request, a required field is missing");
      res.send({ Error: "Invalid PTO Request, a required field is missing" });
    }
  });
}

module.exports = newPtoRequest;
