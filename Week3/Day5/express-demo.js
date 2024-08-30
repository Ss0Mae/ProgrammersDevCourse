const express = require('express')
const app = express()

// Get Method + "/"
app.get('/', function (req, res) {
  res.send('Hello World')
})

// API : GET + "http://localhost:1234/test"
// TEST SUCCESS
app.get('/test', function (req, res) {
  res.send('TEST SUCCESS')
})

// API : GET + "http://localhost:1234/test/1"
// ONE
app.get('/test/1', function (req, res) {
  res.send('ONE!')
})


app.listen(1234)