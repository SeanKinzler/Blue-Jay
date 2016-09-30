import React, { Component } from 'react';
import Message from './ChatMessage.jsx';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { 
          user: 'Chad',
          text: 'I luv to chat.',
        }, 
        {
          user: 'Eric',
          text: 'I love to chat to Chad.',
        }, 
        {
          user: 'Kinzler',
          text: 'I love to chat to Chad too, Chad.',
        },
        {
          user: 'Chad',
          text: 'Please, stop.'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        {this.state.messages.map(function (messageObject) {
          return <Message message={ messageObject } />
        })}
      </div>
    );
  }
};



