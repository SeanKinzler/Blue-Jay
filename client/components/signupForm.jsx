import React, { Component } from 'react';

export default (props) => {
  return (
    <div>
      Username: <input type="text" id='signupUsername'></input>
      Password: <input type="password" id='signupPassword1'></input>
      Password: <input type="password" id='signupPassword2'></input>
      <input type="submit" id='signup' onClick={props.signup}></input>
    </div>
  );
};



