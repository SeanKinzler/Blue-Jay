import React, { Component } from 'react';
import Video from '../components/Video.jsx';
import InfoBox from '../components/InfoBox.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import Whiteboard from '../components/Whiteboard.jsx'
import {Link} from 'react-router';

const data = {
  title: 'cat',
  uploader: 'person',
  description: 'cat video',
  tags: 'tag',
  category: 'Art'
};

export default ({params}) => {
  return(
    <div className='channel'>
      <Video />
      <InfoBox stuff={data}/>
      <Whiteboard />
    </div>
  );
};