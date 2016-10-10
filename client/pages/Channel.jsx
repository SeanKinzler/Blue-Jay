import React, { Component } from 'react';
import Video from '../components/Video.jsx';
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
        <div className='col s4 center-align' id='class background'>
          <h5>History and the Art of History Stuff</h5>
        </div>
        <div className='col s4 center-align' id='teacher background'>
          <h5>Your instructor: Hans Zimmer</h5>
        </div>
        <div className='col s4 center-align' id='class links' >
          <h5>Class Links and Relevent Pages</h5>
          <a className='col s4' src='www.google.com'>Google seems important</a>
          <a className='col s4' src='www.google.com'>Google seems important</a>
          <a className='col s4' src='www.google.com'>Google seems important</a>
          <a className='col s4' src='www.google.com'>Google seems important</a>
          <a className='col s4' src='www.google.com'>Google seems important</a>
        </div>

      </div>
    </div>
  )  
}