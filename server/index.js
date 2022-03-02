const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile('server/joenjoe.png', {root: '.'})
})

app.get('/hello', (req, res) => {
  res.send('hello world!')
})

module.exports = app;
