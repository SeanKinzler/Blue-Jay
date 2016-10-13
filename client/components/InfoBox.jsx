import React, { Component } from 'react';

export default ({video, creatorName}) => {
  if (!video) {
    return <div>loading video data...</div>;
  }
  return (
    <div className="infoBox">
      <div>
        Title:{ video.title }<br/>
        Description:{ video.description }<br/>
        Creator: { creatorName }<br/>
        Subscribers: { video.subscriberCount } 
      </div>
    </div>
  );
};