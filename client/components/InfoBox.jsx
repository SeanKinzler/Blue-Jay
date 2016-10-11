import React, { Component } from 'react';

export default (props) => {
  return (
    <div className="infoBox">
      <h1>{props.stuff.title}</h1>
      <h2>{props.stuff.uploader}</h2>
      <span>{props.stuff.description}</span>
      <span>{props.stuff.tags}</span>
      <span>{props.stuff.category}</span>
    </div>
  );
};