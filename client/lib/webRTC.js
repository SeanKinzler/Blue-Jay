module.exports = function (room, user, socket, browserHistory) {
  navigator.getUserMedia({
    video: true,
    audio: true,
  }, function (stream) {

    window.parentStream = stream;
    window.ownStream = stream;

    var localVid = document.getElementById('localVideo');
    localVid.muted = 'muted';
    localVid.src = window.URL.createObjectURL(stream);

    peers = {};
    var host = false;

    var myEvent = window.attachEvent || window.addEventListener;
    var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload';

    myEvent(chkevent, function(e) {
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


    var sendOffer = function (targetUserId, yourUserId) {

      var id = targetUserId;

      peers[id] = new RTCPeerConnection(ICE);

      peers[id].addStream(ownStream);

      peers[id].onaddstream = function (media) {
        window.parentStream = media.stream;
        addVideo(media.stream, targetUserId);
      };

      peers[id].onicecandidate = function (event) {
        if (!!event.candidate) {
          socket.emit('ice-candidate', {
            recipient: targetUserId,
            candidate: event.candidate,
            returnAddress: yourUserId,
          });
        }
      };

      peers[id].oniceconnectionstatechange = function(event) {
        if (peers[id].iceConnectionState === 'disconnected') {
          peers[targetUserId].close();
          delete peers[targetUserId];
          if (!host) {
            removeVideo(targetUserId);
          }
        } else if (peers[id].iceConnectionState === 'completed') {

          window.checkForHelp = setInterval(function () {
            if (!host && document.getElementById('remoteVideo').src.slice(0, 4) !== 'blob') {
              socket.emit('ready');
            }
          }, 2000);

          var localStream = peers[targetUserId].getLocalStreams()[0];
          var audioTracks = localStream.getAudioTracks();
          audioTracks.forEach(function (track) {
            localStream.removeTrack(track);
          });
        }
      };

      peers[id].createOffer(function (offerObj) {
        peers[id].setLocalDescription(offerObj);
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
        } else if (peers[id].iceConnectionState === 'completed') {
          var localStream = peers[targetUserId].getLocalStreams()[0];
          var audioTracks = localStream.getAudioTracks();
          audioTracks.forEach(function (track) {
            localStream.removeTrack(track);
          });
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
      clearInterval(window.checkForHelp);

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
      var remoteVideo = document.getElementById('remoteVideo');
      remoteVideo.muted = 'muted';
      remoteVideo.src = window.URL.createObjectURL(ownStream);

      localVid.parentNode.removeChild(localVid);
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
        token: localStorage.token,
      });
    });

    socket.emit('ready');

  }, function (error) {
    socket.disconnect();
    console.error(new Error(error));
    browserHistory.push('/nomedia');
  });
};







