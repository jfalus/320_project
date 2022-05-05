const { models } = require('../../sequelize/sequelizeConstructor')
const checkLoggedIn = require('../authentication/checkLoggedIn');
const isManagerOf = require('../employee/isManagerOf');

/**
 * Checks if assigned training is valid by checking if the necessary fields are sent as needed 
 * @param {int} e_id employee ID  
 * @param {string} title title of training 
 * @param {string} desc description
 * @param {string} link link to training page
 * @param {string} date_due due date of training
 * @param {Array.<string>} assigned_to employee email(s) of who the training is assigned to
 * 
 */
function isValidAT(e_id, title, desc, link, date_due, assigned_to) {
  let valid = false
  if (e_id !== null && title.length > 0 && desc.length > 0 && link.length > 0 && date_due !== null && assigned_to.length > 0) { //first checks that no empty values were given
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/ //checks if the date was formatted correctly when given
    const valid_date = regex.test(date_due)
    const check = assigned_to => assigned_to.every(i => (typeof i === 'string'))  //checks if the assigned_to array is an array of strings
    valid = Number.isInteger(e_id) && typeof title === 'string' && typeof desc === 'string' && typeof link === 'string' && valid_date && check(assigned_to)
  }
  return valid  //returns true if valid entry and false if not a valid entry
}

/**
 * Creates new assigned training(s)
 * @param {Express} app  
 * 
 */
function newAssignedTraining(app) {
  app.post('/api/empTasks/newAssignedTraining', checkLoggedIn, async(req,res) => { //post call
    console.log(req.user)
    const e_id = parseInt(req.user.e_id)  //parses the e_id into an integer
    if (isValidAT(e_id, req.body.title, req.body.description, req.body.link, req.body.date_due, req.body.assigned_to)) {  //checks the validity of the entry
      const arr = []  //the array that the entries will be logged into before creation
      for (let i = 0; i < req.body.assigned_to.length; i++) { //loops through the assigned_to array of emails 
        console.log(req.body.assigned_to[i])
        try { //we have a try catch to see if we can find the specified employee in the database
          const emp = await models.employees.findOne({  //retrieve the employee
            where: {email: req.body.assigned_to[i]}
          })
          const assigned_id = parseInt(emp.e_id)  //parses the assigned_to email into an e_id
          const bool = await isManagerOf(req.user, assigned_id) //we find if the user is a manager of the requested person
          if (!bool && !req.user.isAdmin) {  //throws error if the employee hierarchy is violated
            res.status(400)
            console.log('Error: Violates Employee Hierarchy')
            res.send({Error: 'Violates Employee Hierarchy'});
            break;
          }
          const data = {e_id: e_id, title: req.body.title, description: req.body.description, link: req.body.link, date_due: req.body.date_due, progress: 'Not-started', assigned_to: assigned_id}
          arr[i] = data //logs the data entry
        } catch (error) { //case if an employee is not found, sends an error to the user that the given assigned email is not in the database
          res.status(400)
          console.log('Error: ' + req.body.assigned_to[i] + ' is not a valid email')
          res.send({Error: req.body.assigned_to[i] + ' is not a valid email'})
        }
        
      }
      const x = await models.assigned_training.bulkCreate(arr)  //creates the valid entries in the array
      res.send(arr)
    } else {  //sends an error if the given data is not valid
      res.status(400)
      console.log('Error: Invalid assigned training, a required field is missing')
      res.send({Error: 'Invalid assigned training, a required field is missing'})
    }
  })
}

module.exports = newAssignedTraining