import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

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

  render() {
    return (
      <div>
        <h1>Blue Jay!</h1>
        <LoginForm loginHandler={this.loginHandler.bind(this)} />
        <SignupForm signupHandler={this.signupHandler.bind(this)} />
      </div>
    );
  }
}



