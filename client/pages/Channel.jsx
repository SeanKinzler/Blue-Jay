import React, { Component } from 'react';
import Video from '../components/Video.jsx';
import InfoBox from '../components/InfoBox.jsx';
import ChatContainer from '../components/InfoBox.jsx';
import {Link} from 'react-router';

export default ({params}) => {
  return(
    <div className='channel'>
      <div>
        <h4 className='center-align'>Channel: { `${params.channelId}` }</h4>
        <Video />
      </div>
      <div className='row'>
        <button className="toggleInfoBox" onClick={('.infoBox').toggle();}></button>
        <InfoBox />
      </div>
      <div>
        <button className="toggleChat" onClick={$('.chat').toggle();}></button>
        <ChatContainer />
      </div>
      <div>
        <button className="toggleWhiteboard" onClick={$('.whiteboard').toggle();}></button>
        <Whiteboard />
      </div>
    </div>
  );
};