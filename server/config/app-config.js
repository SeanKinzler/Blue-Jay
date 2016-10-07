var express = require('express');
var bodyParser = require('body-parser').json;
var path = require('path');
var dbHandler = require('../db/rawSQLHandlers');
var fs = require('fs');

var app = express();
app.use(bodyParser());

app.use(express.static(path.join(__dirname, '../../client')));

app.post('/users/login', (req, res) => {
  res.send({'data': 'Login recieved!'});
});


app.get('/api/users', (req, res) => { dbHandler.getUsers(req, res); });
app.post('/api/users', (req, res) => { dbHandler.addUser(req, res); });

app.get('/api/users/:username', (req, res) => { dbHandler.getUser(req, res); });
app.delete('/api/users/:username', (req, res) => { dbHandler.deleteUser(req, res); });
app.put('/api/users/:username/', (req, res) => { dbHandler.updateUser(req, res); })

app.get('/api/users/:username/subscriptions', (req, res) => { dbHandler.getSchedule(req, res); });
app.post('/api/users/:username/subscriptions', (req, res) => { dbHandler.subscribeUser(req, res); });
app.put('/api/users/:username/subscriptions', (req, res) => { dbHandler.updateSubscription(req, res); });

app.post('/api/streams', (req, res) => { dbHandler.addStream(req, res); });
app.get('/api/streams/', (req, res) => { dbHandler.searchStreams(req, res); });

app.get('/api/streams/:title', (req, res) => { dbHandler.getStream(req, res); });
app.put('/api/streams/:title', (req, res) => { dbHandler.updateStream(req, res); });
app.delete('/api/streams/:title', (req, res) => { dbHandler.deleteStream(req, res); });


// Catch-all will redirect to react app then re-routed by react-router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
});

var serverConfig = {
  key: fs.readFileSync(path.join(__dirname, './key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './cert.pem')),
  ca: fs.readFileSync(path.join(__dirname, './chain.pem'))
  
};

module.exports = require('https').createServer(serverConfig, app);