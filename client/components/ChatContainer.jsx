import React, { Component } from 'react';
import Message from './ChatMessage.jsx';
import style from '../styles.js';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      user: props.user,
      room: props.room,
      messages: [{
        user: '',
        text: 'You have entered the room: "' + props.room + '"',
      }]
    };

    window.__context = this;
  }

  componentDidUpdate() {
    var chatBox = document.getElementById('chats');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentDidMount() {
    var context = this;
    this.state.socket.on('chatMessage', function (data) {
      context.state.messages.push({
        user: data.user,
        text: data.text
      });

      context.forceUpdate();
    });
  }

  sendMessage(e) {
    e.preventDefault();

    var submission = document.getElementById('messageText');
      console.log(window.__context.state.socket);

    window.__context.state.socket.emit('chatMessage', {
      room: window.__context.state.room,
      user: window.__context.state.user,
      text: submission.value,
    });

    window.__context.state.messages.push({
      user: window.__context.state.user,
      text: submission.value,
    });

    submission.value = '';

    window.__context.forceUpdate();
  }

  render() {
    return (
      <div>
        <div id='chats' style={ style.chatterbox }>
          { 
            this.state.messages.map(function (messageObject, index) {
              return <Message message={ messageObject } key={ index } />
            }) 
          }
        </div>
        <form onSubmit={ this.sendMessage }>
          <input type='text' id='messageText'></input>
          <input className='btn blue' type='submit' value='Send'></input>
        </form>
      </div>
    );
  }
};



