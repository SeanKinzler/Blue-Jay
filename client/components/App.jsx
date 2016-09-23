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
      <div>I don't even want to die right now.</div>
    );
  }
}



