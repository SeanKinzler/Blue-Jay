import React, { Component } from 'react';
import Video from '../components/Video.jsx';
import InfoBox from '../components/InfoBox.jsx';
import ChatContainer from '../components/InfoBox.jsx';
import {Link} from 'react-router';

export default ({params}) => {
  return(
    <div className=''>
      <h4 className='center-align'>Channel: { `${params.channelId.split('_').join(' ')}` }</h4>
      <Video />
      <div id='infoPane'>
        <div className='teal' id='infoBanner'>
          <h3 className='center-align white-text'>Class Info Below</h3>
        </div>
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