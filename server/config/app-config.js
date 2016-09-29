var express = require('express');
var bodyParser = require('body-parser').json;
var path = require('path');


var app = express();
app.use(bodyParser());

app.use(express.static(path.join(__dirname, '../../client')));

app.post('/users/login', (req, res) => {
  res.send({'data': 'Login recieved!'});
});

app.post('/users/signup', (req, res) => {
  res.send({'data': 'Signed up!'});
});

// Catch-all will redirect to react app then re-routed by react-router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
});

module.exports = app;