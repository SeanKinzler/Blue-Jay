import React, { Component } from 'react';
import Message from './ChatMessage.jsx';
import style from '../styles.js';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
      messages: [{
        user: '',
        text: 'You have entered the room: "' + window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1) + '"',
      }]
    };

    window.__context = this;
  }

  componentDidUpdate() {
    var chatBox = document.getElementById('chats');
    console.log(chatBox);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentDidMount() {

    var context = this;
    setTimeout(function () {
      window.socket.on('chatMessage', function (data) {
        context.state.messages.push({
          user: data.user,
          text: data.text
        });

        context.forceUpdate();
      });
    }, 750);
  }

  sendMessage(e) {
    e.preventDefault();

    var submission = document.getElementById('messageText');

    socket.emit('chatMessage', {
      room: room,
      user: localStorage.user,
      text: submission.value,
    });

    window.__context.state.messages.push({
      user: localStorage.user,
      text: submission.value,
    });

    window.__context.forceUpdate();

    submission.value = '';
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
          <input type='submit' text='Send'></input>
        </form>
      </div>
    );
  }
};



