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
    <div className="page videoPage">
      <h1>Video Here</h1>
      <video id="localVideo" muted autoPlay></video>
      <video id="remoteVideo" autoPlay></video>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.js"></script>
      <script type="text/javascript" src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
      <script type="text/javascript" src="./lib/webRTC.js"></script>
    </div>
    );
  }
};