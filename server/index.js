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

  socket.on('offer', function (data) {
    socket.to(data.recipient).emit('offer', data);
  });

  socket.on('answer', function (data) {
    socket.to(data.recipient).emit('answer', data);
  });

  socket.on('check', function (roomName) {
    if (socket.adapter.rooms[roomName]) {
      var userIds = [];
      var yourId;

      for (var key in socket.adapter.rooms[roomName].sockets) {
        userIds.push(key);
      }

      socket.join(roomName);
      for (var key in socket.adapter.rooms[roomName].sockets) {
        if (userIds.indexOf(key) === -1) {
          yourId = key;
        }
      }

      socket.emit('joined', {
        message: 'You have joined the room: "' + roomName + '"',
        userIds: userIds,
        yourId: yourId
      });
    } else {
      socket.join(roomName);
      socket.emit('created', 'You have created the room: "' + roomName + '"');
    }
  });

});


var port = process.env.PORT || 8443;
server.listen(port);
console.log('Listening on port: ' + port);
