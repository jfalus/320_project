const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const {models} = require('./sequelize/sequelizeConstructor');
const path = require("path");
// var jsonMerger = require("json-merger");
require('dotenv').config()

const app = express()

app.use(express.static("../client/public"));

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

//This is a terrible way of doing this. Replace with require-all later.
const endpoints = [
  require('./endpoints/assigned_training/assignedTrainings'),
  require('./endpoints/assigned_training/newAssignedTraining'),
  require('./endpoints/assigned_training/updateAssignedTraining'),
  require('./endpoints/authentication/logout'),
  require('./endpoints/employee/allManagedEmployees'),
  require('./endpoints/employee/directManagedEmployees'),
  require('./endpoints/general_task/generalTasks'),
  require('./endpoints/general_task/newGeneralTask'),
  require('./endpoints/general_task/updateGeneralTask'),
  require('./endpoints/performance_review/newPerformanceReview'),
  require('./endpoints/performance_review/performanceReviews'),
  require('./endpoints/performance_review/updatePerformanceReview'),
  require('./endpoints/pto_request/newPtoRequest'),
  require('./endpoints/pto_request/ptoRequests'),
  require('./endpoints/pto_request/updatePtoRequests')
];

for(const endpoint of endpoints){
  endpoint(app);
}

require('./endpoints/authentication/login')(app, passport)

app.get('/hello', async (req, res) => {
  res.send("Hello, World!");
})

//I don't know what this does but others use it
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

module.exports = app;


