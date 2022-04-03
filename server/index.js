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

async function getManagedEmployees(db, user){
  try{
    if(user.isManager){
      const managedEmployees = await db.findAll({
        attributes: ['firstName', 'lastName', 'employeeId', 'email', 'positionTitle'],
        where: {
          companyId: user.companyId,
          managerId: user.employeeId,
        }
      });
      return managedEmployees;
    }
    return [];
  }catch(error){
    console.log(error);
    return [];
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

app.get('/managedEmployees', 
  checkLoggedIn,
  async (req, res) => {
    const result = await getManagedEmployees(models.employees, req.user);
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

// GET /api/testGetLocalEmps/aBigInt
// ex: /api/testGetLocalEmps/1234
// Passes json file with Employee Id, First Name, Last Name, Email, and Position Title of each employee in
// company with given companyId
app.get('/api/testGetLocalEmps/:CID', checkLoggedIn, async (req, res) => {
  const users = await models.employees.findAll({
    attributes: ['employeeId', 'firstName', 'lastName', 'email', 'positionTitle'],
    where: {
      companyId: req.params.CID
    }
  });
  res.json(users)
})

// GET /api/empTasks/assignedTraining/aBigInt
// ex: /api/testGetLocalEmps/1234
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

// GET /api/empTasks/assignedTraining/aBigInt
// ex: /api/testGetLocalEmps/1234
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

// GET /api/empTasks/assignedTraining/aBigInt
// ex: /api/testGetLocalEmps/1234
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

// GET /api/empTasks/generalTasks/aBigInt
// ex: /api/testGetLocalEmps/1234
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

function createGeneralTask(e_id, title, desc, date_due) {
  return models.general_task.create({
    e_id: e_id,
    title: title,
    description: desc,
    date_due: date_due,
    progress: 'Not-started',
    assigned_to: null,
  })
}

function createAssignedTraining(e_id, title, desc, link, date_due) {
  return models.assigned_training.create({
    e_id: e_id,
    title: title,
    description: desc,
    link: link,
    date_due: date_due,
    progress: 'Not-started',
  })
}

function createPtoRequest(e_id, title, desc, start_date, end_date, date_due) {
  return models.pto_request.create({
    e_id: e_id,
    title: title,
    description: desc,
    start_date: start_date,
    end_date: end_date,
    date_due: date_due,
    progress: 'Not-started',
    approved: false,
    assigned_to: null,
  })
}

function createPerformanceReview(e_id, title, assigned_to, date_due) {
  return models.performance_review.create({
    e_id: e_id,
    title: title,
    overall_comments: null,
    growth_feedback: 0,
    kindness_feedback: 0,
    delivery_feedback: 0,
    date_due: date_due,
    progress: 'Not-started',
    assigned_to: assigned_to,
  })
}

function isValidGT(e_id, title, desc, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

function isValidAT(e_id, title, desc, link, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    link !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

function isValidPR(e_id, title, assigned_to, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    assigned_to !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

function isValidPTO(e_id, title, desc, start_date, end_date, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    start_date !== null &&
    end_date !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

app.post('/api/empTasks/new-general_task', checkLoggedIn, async (req, res) => {
  res.send(
    await createGeneralTask(
      models.general_task,
      req.query.EID,
      req.query.TITLE,
      req.query.DESCRIPTION,
      req.query.DATE_DUE
    )
  )
})

app.post('/api/empTasks/new-pto_request', checkLoggedIn, async (req, res) => {
  res.send(
    await createPtoRequest(
      models.pto_request,
      req.query.EID,
      req.query.TITLE,
      req.query.DESCRIPTION,
      req.query.START_DATE,
      req.query.END_DATE,
      req.query.DATE_DUE
    )
  )
})

app.post(
  '/api/empTasks/new-assigned_training',
  checkLoggedIn,
  async (req, res) => {
    res.send(
      await createAssignedTraining(
        models.assigned_training,
        req.query.EID,
        req.query.TITLE,
        req.query.DESCRIPTION,
        req.query.LINK,
        req.quqery.DATE_DUE
      )
    )
  }
)

app.post(
  '/api/empTasks/new-performance_review',
  checkLoggedIn,
  async (req, res) => {
    res.send(
      await createPerformanceReview(
        models.performance_review,
        req.query.EID,
        req.query.TITLE,
        req.query.assigned_to,
        req.query.DATE_DUE
      )
    )
  }
)

module.exports = app;
