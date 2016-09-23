import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: props.cat,
    };
  }

  render() {
    return (
      <div onClick={function () {
        console.log(this.state.cat);
      }.bind(this)}>I am a cat.</div>
    );
  }
}



