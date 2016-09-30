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

  socket.on('ice-candidate', function (data) {
    socket.to(data.recipient).emit('ice-candidate', data);
  });

  socket.on('ice-merge', function (data) {
    socket.to(data.recipient).emit('ice-merge', data);
  });

  socket.on('check', function (data) {
    if (socket.adapter.rooms[data.roomName]) {
      var userIds = [];
      var yourId;

      for (var key in socket.adapter.rooms[data.roomName].sockets) {
        userIds.push(key);
      }

      socket.join(data.roomName);
      for (var key in socket.adapter.rooms[data.roomName].sockets) {
        if (userIds.indexOf(key) === -1) {
          yourId = key;
        }
      }

      socket.emit('joined', {
        message: 'You have joined the room: "' + data.roomName + '"',
        userIds: userIds,
        yourId: yourId
      });

      socket.emit('chatMessage', {
        user: 'You have joined the room: ' + data.roomName,
        text: '',
      });

      socket.broadcast.to(data.roomName).emit('chatMessage', {
        user: '',
        text: data.user + ' has joined the room.',
      });  

    } else {
      socket.join(data.roomName);

      socket.emit('created', 'You have created the room: "' + data.roomName + '"');
    }
  });

  socket.on('chatMessage', function (data) {
    socket.broadcast.to(data.room).emit('chatMessage', data);
  });
});


var port = process.env.PORT || 8443;
server.listen(port);
console.log('Listening on port: ' + port);
