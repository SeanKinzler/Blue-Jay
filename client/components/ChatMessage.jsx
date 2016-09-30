import React, { Component } from 'react';

export default ({messageObject}) => {
  return (
      <div className="card horizontal">
        <div className="card-image">
          <img src="http://lorempixel.com/100/190/nature/6"></img>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
  );
};



