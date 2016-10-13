import React, { Component } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';
import io from 'socket.io-client';
import Video from '../components/Video.jsx';
import InfoBox from '../components/InfoBox.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import Whiteboard from '../components/Whiteboard.jsx';
import urlHelper from '../utils/urlHelper.jsx';

class StreamRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect()
    }
  }

  componentDidMount() {
    const streamName = urlHelper.deslugify(this.props.params.streamSlug);
    this.props.requestStreamInfo(streamName);
  }

  componentWillUnmount() {
    this.props.leaveStream();
  }

  render() {
    return (
      <div className='container'>
        <Video socket={ this.state.socket } />
        <InfoBox video={ this.props.video } creatorName={ this.props.params.creatorName } />
        <Whiteboard socket={ this.state.socket } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    video: state.video.stream
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(StreamRoom);