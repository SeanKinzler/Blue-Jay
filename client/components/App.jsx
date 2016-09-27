import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link } from 'react-router';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import Video from './Video.jsx';
import Dashboard from '../pages/Dashboard.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }


  loginHandler(e) {
    e.preventDefault();
    fetch('https://localhost:8000/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
      })
    })
    .then((response) => {
      this.state = {authenticated: true}
    })
    .catch((error) => {
      console.log(error);
    })
  }

  signupHandler(e) {
    e.preventDefault();
    // Place this logic elsewhere
    if (e.target.password1.value !== e.target.password2.value) {
      alert('Passwords dont match')
      return;
    }
    fetch('https://localhost:8000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        password1: e.target.password1.value,
        password2: e.target.password2.value
      })
    })
    .then((response) => {
      this.state = {authenticated: true}
    })
    .catch((error) => {
      console.log(error);
    })
  }
  //<LoginForm loginHandler={this.loginHandler.bind(this)} />
  render() {
    var children = this.props.children;
    return (
      <div>
        <h1>Blue Jay!</h1>
        { children } 
      </div>
    );
  }
}



