var socketIO = require('socket.io')();
var Tree = require('./connectionTree.js');
var fs = require('fs');
var path = require('path');

var serverConfig = {
  key: fs.readFileSync(path.join(__dirname, './key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './cert.pem')),
  // ca: fs.readFileSync(path.join(__dirname, './chain.pem'))
};

var server = require('https').createServer(serverConfig, require('./app-config.js'));

var io = socketIO.listen(server);

var rooms = {};

var currentRoom = {};


io.sockets.on('connection', function(socket) {

  socket.on('ready', function () {
    socket.emit('start', Date.now());
  });

  socket.on('stop', function (data) {
    currentRoom[socket.id] = data.roomName;
    if (socket.adapter.rooms[data.roomName]) {
      var yourId = socket.id;

      rooms[data.roomName]._remove(socket.id);
      rooms[data.roomName].add(yourId, Date.now() - data.time, function (targetId, selfId) {

        socket.emit('RTC-target', {
          userIds: [targetId],
          yourId: selfId,
        });

        socket.emit('chatMessage', {
          user: 'You have joined the room: ' + data.roomName,
          text: '',
        });

        socket.broadcast.to(data.roomName).emit('chatMessage', {
          user: '',
          text: data.user + ' has joined the room.',
        });  
      });

    } else {
      socket.join(data.roomName);

      rooms[data.roomName] = new Tree(socket.id, 0);
        
      socket.emit('created', 'You have created the room: "' + data.roomName + '"');
    }
  });

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


  socket.on('chatMessage', function (data) {
    socket.broadcast.to(data.room).emit('chatMessage', data);
  });

  socket.on('disconnect', function () {
    if (rooms[currentRoom[socket.id]]) {

      rooms[currentRoom[socket.id]].remove(socket.id, function (targetId, selfId) {
        socket.to(selfId).emit('RTC-target', {
          userIds: [targetId],
          yourId: selfId,
          deleteTarget: socket.id,
        });
      });
    }
  });
});


module.exports = server;





