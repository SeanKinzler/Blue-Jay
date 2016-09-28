var room;
var peers = {};

while (!localStorage.user) {
  localStorage.user = prompt('What is your username?');
}

while (!room) {
  room = prompt('Which room do you want to join?');
}

socket = io.connect();

socket.on('joined', function (data) {
  console.log(data);
});

socket.on('created', function (data) {
  console.log(data);
});

socket.emit('start', localStorage.user);

var askForCamera = function () {
  navigator.getUserMedia({
    video: true,
    audio: false, 
  }, function (stream) {
    var localSrc = window.URL.createObjectURL(stream);
    document.getElementById('localVideo').src = localSrc;
  }, function (error) {
    setTimeout(function () {
      askForCamera();
    }, 500);
  });
}; askForCamera();

socket.emit('check', room);