import React, { Component } from 'react';
import Video from '../components/Video.jsx';
import {Link} from 'react-router';
export default ({params}) => {
  return(
    <div className=''>
      <h1 className='center-align'>Channel: { `${params.channelId}` }</h1>
      <Video />
      <div id='infoPane'>
        <div className='teal' id='infoBanner'>
          <h3 className='center-align white-text'>Class Info Below</h3>
        </div>
      </div>
    </div>
  )  
}