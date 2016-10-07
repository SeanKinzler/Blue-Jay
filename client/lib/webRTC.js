module.exports = function (room, user, socket) {


  peers = {};
  var parent = null;
  var parentStream;
  var localSrc;
  var host = false;
  var initial = true;

  var myEvent = window.attachEvent || window.addEventListener;
  var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload';

  myEvent(chkevent, function(e) {
    console.log('okay!');
    for (var key in peers) {
      peers[key].close();
    }  
  });

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

  // FOR KINZLER TO EDIT. //////////////////////////////////////////////////////////////////////

  var addVideo = function (source, elementId) {

    document.getElementById('remoteVideo').src = window.URL.createObjectURL(source);

  };

  var removeVideo = function (id) {
    document.getElementById('remoteVideo').src = '';
  };

  //////////////////////////////////////////////////////////////////////////////////////////////

  navigator.getUserMedia({
    video: true,
    audio: true,
  }, function (stream) {
    parentStream = stream;

    var askForCamera = function () {
      navigator.getUserMedia({
        video: true,
        audio: false, 
      }, function (stream) {
        localSrc = window.URL.createObjectURL(stream);

        var localVideoPort = document.getElementById('localVideo');
        if (localVideoPort) {
          localVideoPort.src = localSrc;
        } else {
          document.getElementById('remoteVideo').src = localSrc;
        }
      }, function (error) {
        setTimeout(function () {
          askForCamera();
        }, 500);
      });
    };

    askForCamera();

    var sendOffer = function (targetUserId, yourUserId) {
      parent = new RTCPeerConnection(ICE);

      peers[targetUserId] = parent;

      parent.addStream(parentStream);

      parent.onaddstream = function (media) {
        parentStream = media.stream;
        addVideo(media.stream, targetUserId);
      };

      parent.onicecandidate = function (event) {
        if (!!event.candidate) {
          socket.emit('ice-candidate', {
            recipient: targetUserId,
            candidate: event.candidate,
            returnAddress: yourUserId,
          });
        }
      };

      parent.oniceconnectionstatechange = function(event) {
        if (parent.iceConnectionState === 'disconnected') {
          peers[targetUserId].close();
          delete peers[targetUserId];
          if (!host) {
            removeVideo(targetUserId);
          }
        } else if (parent.iceConnectionState === 'completed') {
          var localStream = peers[targetUserId].getLocalStreams()[0];
          localStream.removeTrack(localStream.getAudioTracks()[0]);
        }
      };

      parent.createOffer(function (offerObj) {
        parent.setLocalDescription(offerObj);
        socket.emit('offer', {
          recipient: targetUserId,
          offer: offerObj,
          returnAddress: yourUserId,
        });
      }, function (error) {
        console.log(error);
      });
    };

    var sendAnswer = function (receivedData) {
      peers.length++;
      var id = receivedData.returnAddress;

      peers[id] = new RTCPeerConnection(ICE);

      peers[id].addStream(parentStream);

      peers[id].onicecandidate = function (event) {
        if (!!event.candidate) {
          socket.emit('ice-candidate', {
            recipient: receivedData.returnAddress,
            candidate: event.candidate,
            returnAddress: receivedData.recipient,
          });
        }
      };

      peers[id].oniceconnectionstatechange = function(event) {
        if (peers[id].iceConnectionState === 'disconnected') {
          if (peers[id]) { 
            peers[id].close(); 
            delete peers[id];
          }

          if (!host) {
            removeVideo(receivedData.returnAddress);
          }
        }
      };

      peers[id].setRemoteDescription(new RTCSessionDescription(receivedData.offer))
      .catch(function (error) {
        console.log(error);
      });

      peers[id].createAnswer(function (answerObj) {
        peers[id].setLocalDescription(answerObj);
        socket.emit('answer', {
          answer: answerObj,
          recipient: receivedData.returnAddress,
          returnAddress: receivedData.recipient
        });

      }, function (error) {
        console.log(error);
      });
    };


    socket.on('RTC-target', function (data) {
      host = false;
      if (peers[data.deleteTarget]) {
        peers[data.deleteTarget].close();
        delete peers[data.deleteTarget];
      }

      data.userIds.forEach(function (user, index) {
        sendOffer(user, data.yourId);
      });

    }, function (error) {
      console.log(error);
    });

    socket.on('created', function (data) {
      host = true;
      document.getElementById('remoteVideo').src = localSrc;

      var ownVideo = document.getElementById('localVideo');
      ownVideo.parentNode.removeChild(ownVideo);
    });

    socket.on('offer', function (data) {
      sendAnswer(data);
    });

    socket.on('answer', function (data) {
      peers[data.returnAddress].setRemoteDescription(new RTCSessionDescription(data.answer))
      .then(function () {

      })
      .catch(function (error) {
        console.log(error);
      });
    });

    socket.on('ice-candidate', function (data) {
      if (!!peers[data.returnAddress]) {
        peers[data.returnAddress].addIceCandidate(new RTCIceCandidate(data.candidate))
        .catch(function (error) {
          console.error(error);
        });
      }
    });

    socket.on('start', function (data) {
      socket.emit('stop', {
        roomName: room,
        user: user,
        time: data,
      });
    });

    window.checkForHelp = setInterval(function () {
      if (!host && document.getElementById('remoteVideo').src.slice(0, 4) !== 'blob') {
        parent = null;
        socket.emit('ready');
      }
    }, 2000);

    socket.emit('ready');

  }, function (error) {
    console.log(error);
  });
};







