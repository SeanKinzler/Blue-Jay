module.exports = function (room, user, socket) {
  peers = {};
  var parent = null;
  var children = {};
  var parentStream;

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

    var addedVideo = document.getElementById(id);

    if (!addedVideo) {

      document.getElementById('remoteVideo').src = '';

    } else {

      addedVideo.parentNode.removeChild(addedVideo);

    }

  };

  //////////////////////////////////////////////////////////////////////////////////////////////

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
    navigator.getUserMedia({
      video: true,
      audio: false
    }, function (mediaStream) {
      parent = new RTCPeerConnection(ICE);

      peers[targetUserId] = parent;

      parent.addStream(mediaStream);

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
        } else {
          socket.emit('ice-merge', {
            recipient: targetUserId,
            sdp: parent.localDescription,
            returnAddress: yourUserId,
          });
        }
      };

      parent.oniceconnectionstatechange = function(event) {
        if (parent.iceConnectionState === 'completed') {
          socket.emit('ice-merge', {
            recipient: targetUserId,
            sdp: parent.localDescription,
            returnAddress: yourUserId,
          });
        } else if (parent.iceConnectionState === 'disconnected') {
          delete peers[targetUserId];
          removeVideo(targetUserId);
        }
      };

      parent.createOffer(function (offerObj) {
        parent.setLocalDescription(offerObj);
        socket.emit('offer', {
          recipient: targetUserId,
          offer: offerObj,
          returnAddress: yourUserId,
        });
        console.log('Sent offer!');
      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      console.log(error);
    });
  };

  var sendAnswer = function (receivedData) {
    children.length++;
    var id = receivedData.returnAddress;
    navigator.getUserMedia({
      video: true,
      audio: false,
    }, function (mediaStream) {
      children[id] = new RTCPeerConnection(ICE);
      peers[id] = children[id];

      if (!parent) {
        children[id].addStream(mediaStream);
      } else {
        children[id].addStream(parentStream);
      }

      children[id].onaddstream = function (media) {
        // addVideo(media.stream, receivedData.returnAddress);
      };

      children[id].onicecandidate = function (event) {
        if (!!event.candidate) {
          socket.emit('ice-candidate', {
            recipient: receivedData.returnAddress,
            candidate: event.candidate,
            returnAddress: receivedData.recipient,
          });
        } else {
          socket.emit('ice-merge', {
            recipient: receivedData.returnAddress,
            sdp: children[id].localDescription,
            returnAddress: receivedData.recipient,
          });
        }
      };

      children[id].oniceconnectionstatechange = function(event) {
        if (children[id].iceConnectionState === 'completed') {
          socket.emit('ice-merge', {
            recipient: receivedData.returnAddress,
            sdp: children[id].localDescription,
            returnAddress: receivedData.recipient,
          });
        } else if (children[id].iceConnectionState === 'disconnected') {
          removeVideo(receivedData.returnAddress);
        }
      };

      children[id].setRemoteDescription(new RTCSessionDescription(receivedData.offer))
      .catch(function (error) {
        console.log(error);
      });

      children[id].createAnswer(function (answerObj) {
        children[id].setLocalDescription(answerObj);
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


  socket.on('RTC-target', function (data) {
    console.log(data);
    data.userIds.forEach(function (user, index) {
      sendOffer(user, data.yourId);
    });

  }, function (error) {
    console.log(error);
  });

  socket.on('created', function (data) {
    console.log(data);
  });

  socket.on('offer', function (data) {
    console.log('Got offer!'); 
    sendAnswer(data);
  });

  socket.on('answer', function (data) {
    console.log('Got answer!\n');
    parent.setRemoteDescription(new RTCSessionDescription(data.answer))
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

  socket.on('ice-merge', function (data) {
    console.log(peers);
    peers[data.returnAddress].setRemoteDescription(new RTCSessionDescription(data.sdp))
    .catch(function (error) {
      console.log(error);
    });
  });

  socket.on('start', function (data) {
    socket.emit('stop', {
      roomName: room,
      user: user,
      time: data,
    });
  });


  askForCamera();


  socket.emit('ready');
};







