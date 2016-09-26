import React, { Component } from 'react';
import LoginForm from './loginForm.jsx';
import SignupForm from './signupForm.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  login(e) {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    fetch('https://localhost:8443/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(function (response) {
      response.json()
      .then(function (json) {
        console.log(json);
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  signup(e) {
    var username = document.getElementById('signupUsername').value;
    var password = document.getElementById('signupPassword1').value;
    fetch('https://localhost:8443/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(function (response) {
      response.json()
      .then(function (json) {
        console.log(json);
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>Blue Jay</h1>
        <LoginForm login={this.login} />
        <SignupForm singup={this.signup} />
      </div>
    );
  }
}



