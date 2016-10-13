import React, { Component } from 'react';
import style from '../styles.js';
import regex from '../utils/regex';

export default (props) => {
  return (
    <div>
      <br></br>
      <div className="title">{ regex.scrub(props.message.user + (props.message.user.length ? ':' : '')) }</div>
      <div>{ regex.scrub(props.message.text) }</div>
    </div>
  );
};



