var express = require('express');
var bodyParser = require('body-parser').json;
var path = require('path');

var app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../../client')));

app.post('/users/login', function (req, res) {
  res.send({'data': 'Login recieved!'});
});

app.post('/users/signup', function (req, res) {
  res.send({'data': 'Signed up!'});
});

module.exports = app;