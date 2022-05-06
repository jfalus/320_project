const {models} = require('../../sequelize/sequelizeConstructor');
const checkLoggedIn = require('../authentication/checkLoggedIn');

/**
 * Checks if performance review is valid by checking if the necessary fields are sent as needed 
 * @param {int} e_id employee ID
 * @param {string} title title of performamce review
 * @param {Array.<string>} assigned_to employee email(s) of performance review(s) that is assigned to
 * @param {string} date_due date that performance review is due
 */
function isValidPR(e_id, title, assigned_to, date_due) {
  let valid = false
  if (e_id !== null && title.length > 0 && assigned_to.length > 0 && date_due !== null) { //first checks that no empty values were given
    const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}?$/ //checks if the date was formatted correctly when given
    const valid_date = regex.test(date_due)
    const check = assigned_to => assigned_to.every(i => (typeof i === 'string'))  //checks if the assigned_to array is an array of strings
    valid = Number.isInteger(e_id) && typeof title === 'string' && check(assigned_to) && valid_date
  }
  return valid  //returns true if valid entry and false if not a valid entry
}

/**
 * Creates new performance review
 * @param {Express} app
 */
function newPerformanceReview(app){
  app.post('/api/empTasks/newPerformanceReview', checkLoggedIn, async(req,res) => {
    console.log(req.body)
    const e_id = parseInt(req.user.e_id)  
    if (isValidPR(e_id, req.body.title, req.body.assigned_to, req.body.date_due)) { //checks the validity of the user input
      const arr = []
      for (let i = 0; i < req.body.assigned_to.length; i++) { //loops through the assigned_to array of emails
        console.log(req.body.assigned_to[i])
        try { //try to find each email in the database
          const emp = await models.employees.findOne({
            where: {email: req.body.assigned_to[i]}
          })
          const assigned_id = parseInt(emp.e_id)  //if found, parse the employee retrieved's e_id
          const data = {e_id: e_id, title: req.body.title, overall_comments: null, growth_feedback: null, kindness_feedback: null, delivery_feedback: null,  date_due: req.body.date_due, progress: 'Not-started', assigned_to: assigned_id}
          console.log(data)
          const x = await models.performance_review.create(data)  //create the performance review after checking the validity and existence of the employee in the database
          arr[i] = x.toJSON()
        } catch (error) { //if the assignee is the in the database, send an error to the user
          res.status(400)
          console.log('Error: Created performance reviews up to ' + req.body.assigned_to[i] + ', this input is not a valid email')
          res.send({Error: 'Created performance reviews up to ' + req.body.assigned_to[i] + ', this input is not a valid email'})
        }
      }
      res.send(arr)
    } else {  //if the given data is not valid, send an error to the user
      res.status(400)
      console.log('Error: Invalid Performance Review, a required field is missing')
      res.send({Error: 'Invalid Performance Review, a required field is missing'})
    }
  })
}


module.exports = newPerformanceReview;