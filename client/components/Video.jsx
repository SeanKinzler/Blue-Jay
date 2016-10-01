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
      room: window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1),
    };
  }

  // componentWillMount() {
  //   var script1 = document.createElement('script')
  //   script1.id = '1'
  //   script1.type = 'text/javascript'
  //   script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.js'
  //   script1.async = true;
  //   document.body.appendChild(script1);

  //   var script2 = document.createElement('script')
  //   script2.id = '2'
  //   script2.type = 'text/javascript'
  //   script2.src = 'https://webrtc.github.io/adapter/adapter-latest.js'
  //   script2.async = true;
  //   document.body.appendChild(script2);

  // }
  componentWillMount() {
    EZRTC(this.state.room, this.props.username, this.state.socket);
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
                user={ this.props.username }
                socket={ this.state.socket } />
            </div>
          </div>
          <form></form>
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