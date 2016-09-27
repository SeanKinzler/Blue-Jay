var user;

while (!user) {
  user = prompt('What is your username?');
}

socket = io.connect();

socket.emit('start', user);

navigator.getUserMedia({

  video: true,
  audio: true 

}, function (stream) {

  var videoSrc = window.URL.createObjectURL(stream);
  
  document.getElementById('localVideo');

}, function (error) {
  
  console.log(error);

})