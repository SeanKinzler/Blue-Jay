import React, { Component } from 'react';
import style from '../styles.js';

export default = (props) => {
  <div className="infoBox">
    <div id='infoPane'>
      <div className='teal' id='infoBanner'>
        <h3 className='center-align white-text'>Class Info Below</h3>
      </div>
    </div>
    <h1>{props.title}</h1>
    <h2>{props.uploader}</h2>
    <span>{props.description}</span>
    <span>{props.tags}</span>
    <span>{props.category}</span>
  </div>
};