import React, { Component } from 'react';

export default class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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
  componentDidMount() {

    var script3 = document.createElement('script')
    script3.id = '3'
    script3.type = 'text/javascript'
    script3.src = './../lib/webRTC.js'
    script3.async = true;
    document.body.appendChild(script3);
  }

  render () {
    return (
    <div>
      <div className='row' id='putVidsHere'>
        <video className='col s8' id='remoteVideo'
          poster="http://www.rockymountainrep.com/wp-content/themes/rockymountainrep/library/images/youtube-default.png" 
          autoPlay></video>
        <div className='col s4'>
          <video  className='col s12' id='localVideo'
          poster="http://www.rockymountainrep.com/wp-content/themes/rockymountainrep/library/images/youtube-default.png"
          mute autoPlay></video>
          <div className='container'>
            <h5>chat app?</h5>
            <h5>chat app?</h5>
            <h5>chat app?</h5>
            <h5>chat app?</h5>
          </div>
        </div>
        
      </div>

    </div>
    );
  }
};