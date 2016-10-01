import React, { Component } from 'react';
import style from '../styles.js';
import ChatContainer from './ChatContainer.jsx';
import EZRTC from '../lib/webRTC';
import io from 'socket.io-client';

export default class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(),
      user: localStorage.user || 'DudeClown McDoogle',
      room: window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1),
    };
  }

  componentWillMount() {
    EZRTC(this.state.room, this.state.user, this.state.socket);
  }

  render () {
    return (
      <div>
        <div className='row' id='putVidsHere'>
          <video className='col s9' id='remoteVideo'
            style={ style.flush }
            poster="http://www.rockymountainrep.com/wp-content/themes/rockymountainrep/library/images/youtube-default.png" 
            autoPlay></video>
          <div className='col s3'>
            <video className='col s12' id='localVideo'
            style={ style.flush }
            poster="http://www.rockymountainrep.com/wp-content/themes/rockymountainrep/library/images/youtube-default.png"
            autoPlay></video>
          </div>
          <div className='col s3' >
            <div className="col s11">
              <ChatContainer 
                room={ this.state.room }
                user={ this.state.user }
                socket={ this.state.socket } />
            </div>
          </div>
          <form></form>
        </div>
      </div>
    );
  }
};