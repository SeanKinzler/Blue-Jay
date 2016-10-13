import React from 'react';
import urlUtil from '../utils/urlHelper.jsx';

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      roomId: urlUtil.deslugify(window.location.pathname.slice(1)),
    };
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas('whiteboard', {isDrawingMode: true});

    //Send whiteboard changes to the server:
    this.canvas.on('path:created', () => this.sendWhiteboard());

    //Recieve whiteboard changes from the server:
    this.state.socket.on('dataFromServer', (data) => {
      this.recieveWhiteboard(data);
    });
  }

  sendWhiteboard() {
<<<<<<< HEAD
    let room = urlUtil.deslugify(window.location.pathname.slice(1));
    // let room = urlUtil.deslugify(window.location.pathname.slice(1).split('/')[1]);
    this.socket.emit('dataFromClient', {canvas: JSON.stringify(this.canvas), room: room});
  }

  recieveWhiteboard(data) {
    console.log('Recieved from whiteboard');
    // this.canvas.loadFromJSON(JSON.parse(data), this.canvas.renderAll.bind(this.canvas));
    this.canvas.loadFromJSON(JSON.parse(data), this.canvas.renderAll.bind(this.canvas));
=======
    this.state.socket.emit('dataFromClient', {
      room: this.state.roomId,
      canvasJSON: JSON.stringify(this.canvas),
    });
  }

  recieveWhiteboard(canvasJSON) {
    this.canvas.loadFromJSON(canvasJSON, this.canvas.renderAll.bind(this.canvas));
>>>>>>> 020b74c4cdf38842d605af2a2a414cbfaae01bf1
  }

  render() {
    return (
      <div className="whiteboard">
        <canvas id="whiteboard"></canvas>
      </div>
    );
  }
}

export default Whiteboard;