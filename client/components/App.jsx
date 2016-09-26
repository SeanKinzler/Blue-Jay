// import React, { Component } from 'react';
import {React} from 'react';
import {ReactDOM} from 'react-dom';
import {LoginPage} from './login';
import {VideoPage} from './video';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }

    //Login Handlers:
    this.loginHandlers = {
      login: (event) => {
        this.setState({loggedIn: true});
      }
    }

    //Video Handlers:
    this.videoHandlers = {
      start: (event) => { console.log('Start Video') },
      stop: (event) => { console.log('Stop Video') }
    }
  }

  render() {
    return (
      <div>
        <h1>Blue Jay</h1>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <h1>Blue Jay</h1>
  //       {this.state.loggedIn ? <Login /> : <Video />}
  //     </div>
  //   );
  // }
}

ReactDOM.render(<App />, document.getElementById('app'));
