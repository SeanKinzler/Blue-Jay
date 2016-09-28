var room;
var peers = { length: 0 };

while (!localStorage.user) {
  localStorage.user = prompt('What is your username?');
}

while (!room) {
  room = prompt('Which room do you want to join?');
}


var STUN = {
  urls: 'stun:stun.l.google.com:19302'
};

var TURN = {
  urls: 'turn:turn.bistri.com:80',
  credential: 'homeo',
  username: 'homeo'
};

var ICE = {
  iceServers: [STUN, TURN]
};

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
}; 

var sendOffer = function (targetUserId, yourUserId) {
  peers.length++;
  var id = peers.length + '';
  navigator.getUserMedia({
    video: true,
    audio: true
  }, function (mediaStream) {
    peers[id] = new RTCPeerConnection(ICE);

    peers[id].onaddstream = function (media) {
      document.getElementById('remoteVideo').src = window.URL.createObjectURL(media);
    };

    peers[id].onicecandidate = function (event) {
      if (event.candidate) {

      }
    };

    peers[id].addStream(mediaStream);

    peers[id].createOffer(function (offerObj) {
      peers[id].setLocalDescription(offerObj);
      socket.emit('offer', {
        recipient: targetUserId,
        offer: offerObj,
        returnAddress: yourUserId,
      });
      console.log('Sent offer!')
    }, function (error) {
      console.log(error);
    });
  }, function (error) {
    console.log(error);
  });
};

var sendAnswer = function (receivedData) {
  peers.length++;
  var id = peers.length + '';
  navigator.getUserMedia({
    video: true,
    audio: true,
  }, function (mediaStream) {
    peers[id] = new RTCPeerConnection(ICE);

    peers[id].onaddstream = function (media) {
      document.getElementById('remoteVideo').src = window.URL.createObjectURL(media);
    };

    peers[id].onicecandidate = function (event) {
      if (event.candidate) {

      }
    };

    peers[id].addStream(mediaStream);

    peers[id].setRemoteDescription(new RTCSessionDescription(receivedData.offer));

    peers[id].createAnswer(function (answerObj) {
      peers[id].setLocalDescription(answerObj);
      socket.emit('answer', {
        answer: answerObj,
        recipient: receivedData.returnAddress,
        returnAddress: receivedData.recipient
      });

      console.log('Sent answer!');
    }, function (error) {
      console.log(error);
    });
  }, function (error) {
    console.log(error);
  });
};

socket = io.connect();

socket.on('joined', function (data) {
  
  data.userIds.forEach(function (user, index) {
    sendOffer(user, data.yourId);
  });

}, function (error) {
  console.log(error);
});

socket.on('offer', function (data) {
  console.log('Got offer!:'); 
  console.log(data);
  sendAnswer(data);
});

socket.on('answer', function (data) {
  console.log('Got answer!:\n');
  console.log(data);
});

socket.on('created', function (data) {
  console.log(data);
});


askForCamera();

socket.emit('check', room);