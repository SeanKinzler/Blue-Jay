var app = require('./config/app-config.js');
var path = require('path');
var nodeStatic = require('node-static');
var socketIO = require('socket.io')();
var fs = require('fs');
var os = require('os');
var https = require('https');

var serverConfig = {
  key: fs.readFileSync(path.join(__dirname, './config/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './config/cert.pem'))
};

var fileServer = new nodeStatic.Server();

var server = https.createServer(serverConfig, app);

var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {
  var user;

  socket.on('start', function (data) {
    user = data;
    console.log(user);
  });

});


var port = process.env.PORT || 8443;
server.listen(port);
console.log('Listening on port: ' + port);
