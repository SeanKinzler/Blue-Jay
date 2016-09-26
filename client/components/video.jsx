const VideoPage = (props) => {
  return (
    <div className="page videoPage">
      <h1>Video Here</h1>
      <video className="video local"></video>
      <video className="video remote"></video>
      <span className="startCall" onClick={props.handlers.startCall}>Start Call</span>
      <span className="stopCall" onClick={props.handlers.stopCall}>Stop Call</span>
    </div>
  );
};

export {VideoPage};