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
    this.state.socket.emit('dataFromClient', {
      room: this.state.roomId,
      canvasJSON: JSON.stringify(this.canvas),
    });
  }

  recieveWhiteboard(canvasJSON) {
    this.canvas.loadFromJSON(canvasJSON, this.canvas.renderAll.bind(this.canvas));
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