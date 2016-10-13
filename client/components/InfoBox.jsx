import React, { Component } from 'react';
import isSubscribed from '../utils/isSubscribed.jsx';

export default ({video, creatorName, subscriptions, addSubscription, removeSubscription}) => {

  const isSubscribed = (stream) => {
    if (subscriptions.includes(stream.title)) {
      return (
        <i onClick={ () => { removeSubscription(stream) } } 
           className='material-icons circle teal'>
           done
        </i>
      );
    }
    return (
      <i onClick={ () => { addSubscription(stream) } } 
         className='material-icons circle'>
         done
      </i>
    );
  }

  if (!video) {
    return (
      <ul className="collection hide-on-small-only">
        <li className='collection-item'>
          <span className="title">
            { 'Video data loading...' }
          </span>
        </li>
      </ul>
    )
  }

  return (
    <ul className="collection hide-on-small-only">
        <li className="collection-header">
            <h5 className='center-align'>
              { video.title }
            </h5>
        </li>
        <li className='collection-item'>
          <span className='title center-align'>
            { video.description }
          </span>
        </li>
        <li className="collection-item avatar">
          <i className="material-icons circle teal">perm_identity</i>
          <span className="title">
            <br/>
            <p>{ creatorName }</p>
          </span>
        </li>
        <li className='collection-item'>
          <span>
            { isSubscribed(video) }
          </span>
          <a href="#!" className="secondary-content">
            <i className="material-icons">supervisor_account</i>
            { video.subscriberCount }
          </a>
        </li>
    </ul>
  );
};