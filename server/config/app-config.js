var express = require('express');
var bodyParser = require('body-parser').json;
var path = require('path');
var dbHandler = require('../db/dbRequestHandler');

var app = express();
app.use(bodyParser());

app.use(express.static(path.join(__dirname, '../../client')));

app.post('/users/login', (req, res) => {
  res.send({'data': 'Login recieved!'});
});

app.post('/users/signup', (req, res) => { dbHandler.addUser(req, res); });
app.delete('/users/remove', (req, res) => { dbHandler.deleteUser(req, res); });

app.post('/classes/create', (req, res) => { dbHandler.addClass(req, res); });
app.delete('/classes/remove', (req, res) => { dbHandler.deleteClass(req, res); });
 
// app.post('/classes/signup', (req, res) => {dbHandler.addStudent(req, res)});
// app.post('/classes/:class/', (req, res) => {dbHandler.removeStudent(req, res)});


// Catch-all will redirect to react app then re-routed by react-router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
});

module.exports = app;