import React, { Component } from 'react';

export default ({video, creatorName}) => {
  if (!video) {
    return <div>loading video data...</div>;
  }
  return (
    <ul className="collection">
        <li className="collection-header">
            <h5 className='center-align'>
              { video.title }
            </h5>
        </li>
        <li className='collection-item'>
          <span className='title'>
            { video.description }
          </span>
        </li>
        <li className="collection-item avatar">
          <i className="material-icons circle">folder</i>
          <span className="title">
            { creatorName }
          </span>
        </li>
        <li className='collection-item'>
          <span>
            sub
          </span>
          <a href="#!" className="secondary-content">
            <i className="material-icons">supervisor_account</i>
            { video.subscriberCount }
          </a>
        </li>
    </ul>
  );
};