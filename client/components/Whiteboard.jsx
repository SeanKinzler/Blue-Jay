class Whiteboard extends React.Component {
  constructor() {
    super();

    this.canvas = new fabric.Canvas('whiteboard', {isDrawingMode: true});

    //Connect to the server:
    this.socket = io.connect();

    //Send whiteboard changes to the server:
    this.canvas.on('path:created', () => this.sendWhiteboard());

    //Recieve whiteboard changes from the server:
    this.socket.on('dataFromServer', (data) => this.recieveWhiteboard(data));
  }

  sendWhiteboard() {
    this.socket.emit('dataFromClient', JSON.stringify(this.canvas));
  }

  recieveWhiteboard(data) {
    this.canvas.loadFromJSON(JSON.parse(data), this.canvas.renderAll.bind(this.canvas));
  }

  render() {
    <div className="whiteboard">
      <canvas id="whiteboard"></canvas>
    </div>
  }
}