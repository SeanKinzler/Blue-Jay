import React, { Component } from 'react';
import style from '../styles.js';

export default (props) => {
  return (
    <div>
      <br></br>
      <div className="title">{ props.message.user + (props.message.user ? ':' : '') }</div>
      <div>{ props.message.text }</div>
    </div>
  );
};



