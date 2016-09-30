import React, { Component } from 'react';
import style from '../styles.js';

export default (props) => {
  return (
    <p>
      <div className="title">{ props.message.user }:</div>
      <div>{ props.message.text }</div>
    </p>
  );
};



