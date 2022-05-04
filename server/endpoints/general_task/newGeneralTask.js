const { models } = require("../../sequelize/sequelizeConstructor");
const checkLoggedIn = require("../authentication/checkLoggedIn");

/**
 * Checks if general task is valid by checking if the necessary fields are sent as needed 
 * @param {int} e_id employee ID  
 * @param {string} title title of training 
 * @param {string} desc description
 * @param {Array.<string>} assigned_to employee emails(s) of who the task is assigned to 
 * @param {string} date_due due date of task
 * 
 */
function isValidGT(e_id, title, desc, assigned_to, date_due) {
  let valid = false
  if (e_id !== null && title.length > 0 && desc.length > 0 && assigned_to.length > 0 && date_due !== null) {  //first checks that no empty values were given
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/ //checks if the date was formatted correctly when given
    const valid_date = regex.test(date_due)
    const check = assigned_to => assigned_to.every(i => (typeof i === 'string'))  //checks if the assigned_to array is an array of strings
    valid = Number.isInteger(e_id) && typeof title === 'string' && typeof desc === 'string' && check(assigned_to) && valid_date
  }
  return valid  //returns true if valid entry and false if not a valid entry
}

/**
 * Creates new general task
 * @param {Express} app  
 * 
 */
function newGeneralTask(app){
  app.post('/api/empTasks/newGeneralTask', checkLoggedIn, async (req, res) => {
    console.log(req.body)
    const e_id = parseInt(req.user.e_id)  //parses given e_id into an integer
    if (isValidGT(e_id, req.body.title, req.body.description, req.body.assigned_to, req.body.date_due)) { //checks the validity of the data given
      const arr = []  //array where checked data will be logged
      for (let i = 0; i < req.body.assigned_to.length; i++) { //array of emails will be looped through
        console.log(req.body.assigned_to[i])
        try { //for each email, the email will be looked for in the database
          const emp = await models.employees.findOne({
            where: {email: req.body.assigned_to[i]}
          })
          const assigned_id = parseInt(emp.e_id)  //if found, the employee will have their id parsed
          const data = {e_id: e_id, title: req.body.title, description: req.body.description, date_due: req.body.date_due, progress: 'Not-started', assigned_to: assigned_id}
          console.log(data)
          const x = await models.general_task.create(data)  //if valid and the assignee is found, the general task is created
          arr[i] = x.toJSON()
        } catch (error) { //check that if the employee is not found by email, then the user receives an error
          res.status(400)
          console.log('Error: ' + req.body.assigned_to[i] + ' is not a valid email')
          res.send({Error: req.body.assigned_to[i] + ' is not a valid email'})
        }
      }
      res.send(arr)
    } else {  //if the given entry is not valid, the user receives an error
      res.status(400)
      console.log('Error: Invalid General Task, a required field is missing')
      res.send({Error: 'Invalid General Task, a required field is missing'})
    }
  });
}

module.exports = newGeneralTask;
