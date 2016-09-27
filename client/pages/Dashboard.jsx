import React, { Component } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import {Link} from 'react-router';

export default () => {

  return (
    <div>
      <Link to='/Channel'><h1>Click Here for Video</h1></Link>
      <div>
        <LoginForm />
      </div>
    </div>
  )
  
}