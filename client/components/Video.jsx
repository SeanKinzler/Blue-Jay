import React, { Component } from 'react';
import style from '../styles.js';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import ChatContainer from './ChatContainer.jsx';
import EZRTC from '../lib/webRTC';
import io from 'socket.io-client';
import { connect } from 'react-redux';

class Video extends Component {

  constructor(props) {
    super(props);


    this.state = {
      socket: io.connect(),
      user: localStorage.user || 'DudeClown McDoogle',
      roomId: window.location.pathname.slice(1),
      room: window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1),
      host: window.location.pathname.slice(1, window.location.pathname.lastIndexOf('/')),
    };
  }

  componentWillMount() {
    localStorage.username = this.props.username || localStorage.username;
    EZRTC(this.state.roomId, localStorage.username, this.state.socket);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
    clearInterval(window.checkForHelp);

    parentStream.getTracks().forEach(function (track) {
      track.stop();
    });

    ownStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          
          <div className='col s12 m9'>
            <div className='row' id='putVidsHere'>
              <video
                controls
                className='col s9 m12' 
                id='remoteVideo'
                poster="http://www.rockymountainrep.com/wp-content/themes/rockymountainrep/library/images/youtube-default.png" 
                autoPlay>
              </video>
              <video
                className='col s3' 
                id='localVideo'
                poster="http://www.rockymountainrep.com/wp-content/themes/rockymountainrep/library/images/youtube-default.png"
                autoPlay>
              </video>
            </div>  
          </div>
     
          <div className='col s12 m3' >
              <ChatContainer 
                room={ this.state.room }
                user={ localStorage.username }
                socket={ this.state.socket } 
              />
          </div>

        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {
    username: state.auth.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(Video);