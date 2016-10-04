var server = require('./app-config.js');
var socketIO = require('socket.io')();
var Tree = require('./connectionTree.js');

var io = socketIO.listen(server);

var rooms = {};


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
      var yourId = socket.id;

      rooms[data.roomName].add(yourId, 0, function (targetId, selfId) {

        socket.emit('joined', {
          message: 'You have joined the room: "' + data.roomName + '"',
          userIds: targetId,
          yourId: selfId,
        });

        socket.emit('chatMessage', {
          user: 'You have joined the room: ' + data.roomName,
          text: '',
        });
      });

      socket.broadcast.to(data.roomName).emit('chatMessage', {
        user: '',
        text: data.user + ' has joined the room.',
      });  

    } else {
      socket.join(data.roomName);

      rooms[data.roomName] = new Tree(socket.id, 0);
        
      socket.emit('created', 'You have created the room: "' + data.roomName + '"');
    }
  });

  socket.on('chatMessage', function (data) {
    socket.broadcast.to(data.room).emit('chatMessage', data);
  });

  socket.on('disconnect', function () {
    console.log(socket.adapter.rooms);
    console.log(socket.id);
  });
});


module.exports = server;





