var express = require('express');
var bodyParser = require('body-parser').json;
var path = require('path');

var app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../client')));

module.exports = app;