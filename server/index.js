const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile('joenjoe.png', {root: './server'})
})

app.get('/hello', (req, res) => {
  res.send('hello world!')
})

app.get('/api/testAPI', (req, res) => {
  res.json({ 'string': 'hello!' })
})

// Client is requesting a performance_review from the database
app.get('/api/performance_review', (req, res) => {
  const performance_review = req.body;

  pr_id = performance_review.pr_id;
  // Send a request to the database for the given performance review
})

// Client is pushing a new performance review into the database
app.put('/api/performance_review', (req, res) => {
  const performance_review = req.body;

  
})
module.exports = app;
