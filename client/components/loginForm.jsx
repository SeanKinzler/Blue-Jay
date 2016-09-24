import React, { Component } from 'react';

export default (props) => {
  return (
    <div>
      Username: <input type="text" id="loginUsername" required></input>
      Password: <input type="password" id="loginPassword" required></input>
      <input type="submit" id="login" onClick={ props.login }></input>
    </div>
  );
};







