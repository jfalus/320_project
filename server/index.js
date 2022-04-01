const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const {models} = require('./sequelize/sequelizeConstructor');
const {Op} = require('sequelize');
var jsonMerger = require("json-merger");

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const session = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

async function findUser(db, email){
  try{
    const user = await models.employees.findOne({
      where: {
        email: email
      }
    });
    return user;
  }catch(error){
    console.log(error);
    return [];
  }
}

async function checkCred(db, email, password){
  try{
    const user = await db.findOne({
      attributes: ['e_id'],
      where: {
        email: email,
        password: password
      }
    });
    return user !== null;
  }catch(error){
    console.log(error);
    return false;
  }
}
//strategy for authentication
const strategy = new LocalStrategy(
  async (email, password, done) => {
    //await for user
    const user = await findUser(models.employees, email);
    if (user === null) {
      return done(null, false);
    }
    //add function to check credentials
    checkCred(models.employees, email, password).then(async function(result){
      if (!result) {
        await new Promise((r) => setTimeout(r, 200));
        return done(null, false);
      }
      return done(null, {e_id:user.e_id, employeeId:user.employeeId, companyId:user.companyId, firstName:user.firstName, 
        lastName:user.lastName, email:user.email, companyName:user.companyName, managerId:user.managerId, 
        positionTitle:user.positionTitle, isManager:user.isManager});
    });
  },
);

//initalize the session
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

// Allow JSON inputs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

async function getDirectManagedEmployees(db, user){
  try{
    if(user.isManager){
      return await db.findAll({
        attributes: ['firstName', 'lastName', 'employeeId', 'companyId', 'email', 'positionTitle'],
        where: {
          companyId: user.companyId,
          managerId: user.employeeId,
        }
      });
    }
    return [];
  }catch(error){
    console.log(error);
    return [];
  }
}

async function getAllManagedEmployees(db, user, currentManagers){
  try{
                                      // omitted because it queries the database a lot (SLOW)
    const managerIds = currentManagers/*.filter(m => isManager(db, m))*/.map(m => m.employeeId);
    if(managerIds.length === 0) {return [];}
    const managedEmployees = await db.findAll({
        attributes: ['firstName', 'lastName', 'employeeId', 'companyId', 'email', 'positionTitle'/*, 'managerId', 'password'*/],
        where: {
          companyId: user.companyId,
          managerId: {[Op.in]: managerIds},
        }
      });
      //console.log(currentManagers.map(m => m.employeeId) + ":\n" + managedEmployees.map(m => m.employeeId + "@" + m.managerId));
      return managedEmployees.concat(await getAllManagedEmployees(db, user, managedEmployees));
  }catch(error){
    console.log(error);
    return [];
  }
}

// Updates assigned training with atid assigned to employee with eid. Returns number of fields updated (should be 1) or
// -1 if error.                                                                         progress <- prog
async function updateTraining(db, eid, atid, prog){
  try{
    return await db.update(
      {progress: prog},
      {where: {
        e_id: eid,
        at_id: atid,
        }
      },
    );
  }
  catch(error){
    console.log(error);
    return -1;
  }
}

const SAME = "#SAME";

// Updates performance review with prid assigned to employee with eid. Returns number of fields updated (should be [1-5] if
// called correctly and no error) or -1 if error.                                        progress <- prog,
//                                                                                       growth_feedback <- growth,
//                                                                                       kindness_feedback <- kindness,
//                                                                                       delivery_feedback <- delivery,
//                                                                                       overall_comment <- comments
async function updatePerformanceReview(db, eid, prid, prog, growth, kindness, delivery, comments){
  try{
    up = {};
    if(prog !== SAME) {up.progress = prog;}
    if(growth !== SAME) {up.growth_feedback = growth;}
    if(kindness !== SAME) {up.kindness_feedback = kindness;}
    if(delivery !== SAME) {up.delivery_feedback = delivery;}
    if(comments !== SAME) {up.overall_comments = comments;}
    return await db.update(
      up,
      {where: {
        e_id: eid,
        pr_id: prid,
        }
      },
    );
  }
  catch(error){
    console.log(error);
    return (-1, -1);
  }
}

// Updates pto request with ptoid assigned to employee with eid. Returns number of fields updated (should be 2) or -1 if error.
//                                                                                 progress <- prog,
//                                                                                 approved <- appr
async function updatePTORequest(db, eid, ptoid, prog, appr){
  try{
    return await db.update(
      {progress: prog, approved: appr},
      {where: {
        e_id: eid,
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

// Updates general task with taskid assigned to employee with eid. Returns number of fields updated (should be 2) or
// -1 if error.                                                                      progress <- prog,
//                                                                                   description <- desc
async function updateGeneralTask(db, eid, taskid, prog, desc){
  try{
    return await db.update(
      {progress: prog, description: desc},
      {where: {
        e_id: eid,
        task_id: taskid,
        }
      },
    );
  }
  catch(error){
    console.log(error);
    return -1;
  }
}

app.post('/login',
  passport.authenticate('local', {
    //placeholders for redirects
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/directManagedEmployees', 
  checkLoggedIn,
  async (req, res) => {
    const result = await getDirectManagedEmployees(models.employees, req.user);
    res.send(JSON.parse(JSON.stringify(result)));
  }
);

app.get('/allManagedEmployees', 
  checkLoggedIn,
  async (req, res) => {
    const result = await getAllManagedEmployees(models.employees, req.user, [req.urser]);
    res.send(JSON.parse(JSON.stringify(result)));
  }
);

// app.get('/checkLoggedIn',
//   checkLoggedIn,
//   async (req, res) => {
//     res.send(JSON.parse(JSON.stringify(req.user)));
//   }
// )

app.get('/', (req, res) => {
  res.sendFile('joenjoe.png', {root: './server'})
})

app.get('/hello', (req, res) => {
  res.send('hello world!')
})

app.get('/api/testAPI', (req, res) => {
  res.json({ 'string': 'hello!' })
})

app.get('/api/testDB', async (req, res) => {
  const users = await models.employees.findAll({
    attributes: ['employeeId', 'firstName', 'lastName'],
    where: {
      positionTitle: 'CEO'
    }
  });
  res.json(users)
})

// GET /api/empTasks/assignedTraining/aBigInt
// Passes a json file with the employee's assigned trainings
app.get('/api/empTasks/assignedTrainings', checkLoggedIn, async (req, res) => {
  // const assigned_trainings = await models.assigned_training.findAll({
  //   attributes: ['title', 'description', 'link', 'date_created', 'date_due', 'progress'],
  //   where: {
  //     e_id: req.params.EID
  //   }
  // });
  // res.json(assigned_trainings)
  res.send("Hello World!")
});

/* FOR ^ AND v NEED TO WORK OUT WHO CAN ACCESS WHOSE TRAININGS */

// request must have params EID (employeeId matching training task's e_id), ATID (task's at_id), and PROGRESS (String)
// Passes true if updated successfully, false otherwise
app.put('/api/empTasks/updateAssignedTraining', checkLoggedIn, async (req, res) => {
  //res.send((await updateTraining(models.assigned_training, req.params.EID, req.params.ATID, req.params.PROGRESS)) === 1);
  res.send("Hello World!");
});

// Passes a json file with the employee's performance reviews
app.get('/api/empTasks/performanceReviews', checkLoggedIn, async (req, res) => {
  const performance_reviews = await models.pto_request.findAll({
    attributes: ['title', 'overall_comments', 'growth_feedback', 'kindness_feedback', 'delivery_feedback', 'date-created', 'progress', 'assigned_to'],
    where: {
      e_id: req.params.EID
    }
  });
  res.json(performance_reviews)
});

// request must have params EID (employeeId matching training task's e_id) and PRID (task's pr_id)
// request must have at least one of params PROGRESS (String), GROWTH (int), KINDNESS (int), DELIVERY (int), COMMENTS (String)
// Passes true if updated successfully, false otherwise
app.put('/api/empTasks/updatePerformanceReview', checkLoggedIn, async (req, res) => {
  var hit = 0;
  const pars = [SAME, SAME, SAME, SAME, SAME];
  if('PROGRESS' in req.params) {
    hit += 1;
    pars[0] = req.params.PROGRESS;
  }
  if('GROWTH' in req.params) {
    hit += 1;
    pars[1] = req.params.GROWTH;
  }
  if('KINDNESS' in req.params) {
    hit += 1;
    pars[2] = req.params.KINDNESS;
  }
  if('DELIVERY' in req.params) {
    hit += 1;
    pars[3] = req.params.DELIVERY;
  }
  if('COMMENTS' in req.params) {
    hit += 1;
    pars[4] = req.params.COMMENTS;
  }
  if(hit === 0) {
    res.status(500).send({
      message: "Error: No parameters to update task with."
    });
  }
  //res.send((await updatePerformanceReview(models.performance_review, req.params.EID, req.params.PRID, pars[0], pars[1], pars[2], pars[3], pars[4])) === hit);
  res.send("Hello World!");
});

// Passes a json file with the employee's pto requests
app.get('/api/empTasks/ptoRequests', checkLoggedIn, async (req, res) => {
  const pto_requests = await models.performance_review.findAll({
    attributes: ['title', 'description', 'start_date', 'end_date', 'date_created', 'date_due', 'progress', 'approved', 'assigned_to'],
    where: {
      e_id: req.params.EID
    }
  });
  res.json(pto_requests)
});

// request must have params EID (employeeId matching training task's e_id), PTOID (task's pto_id), PROGRESS (String), and APPROVED (Boolean)
// Passes true if updated successfully, false otherwise
app.put('/api/empTasks/updatePtoRequest', checkLoggedIn, async (req, res) => {
  //res.send((await updatePTORequest(models.pto_request, req.params.EID, req.params.PTOID, req.params.PROGRESS, req.params.APPROVED)) === 2);
  res.send("Hello World!");
});

// GET /api/empTasks/generalTasks/aBigInt
// Passes a json file with the employee's general tasks
app.get('/api/empTasks/generalTasks', checkLoggedIn, async (req, res) => {
  const general_tasks = await models.general_task.findAll({
    attributes: ['title', 'description', 'date_created', 'date_due', 'progress', 'assigned_to'],
    where: {
      e_id: req.params.EID
    }
  });
  res.json(general_tasks)
});

// request must have params EID (employeeId matching training task's e_id), TASKID (task's task_id), PROGRESS (String), and DESCRIPTION (String)
// Passes true if updated successfully, false otherwise
app.put('/api/empTasks/updateGeneralTask', checkLoggedIn, async (req, res) => {
  //res.send((await updateGeneralTask(models.general_task, req.params.EID, req.params.TASKID, req.params.PROGRESS, req.params.DESCRIPTION)) === 2);
  res.send("Hello World!");
});

module.exports = app;
