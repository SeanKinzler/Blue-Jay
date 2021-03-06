import React, { Component } from 'react';
import Message from './ChatMessage.jsx';
import style from '../styles.js';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      user: props.user,
      roomId: props.roomId,
      room: props.room,
      messages: [{
        user: '',
        text: 'You have entered the room: "' + props.room + '"',
      }]
    };

    var context = this;
    this.state.socket.on('chatMessage', function (data) {
      context.state.messages.push({
        user: data.user,
        text: data.text
      });

      context.forceUpdate();
    });

    window.__context = this;
  }

  componentDidUpdate() {
    var chatBox = document.getElementById('chats');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentDidMount() {
    
  }

  sendMessage(e) {
    e.preventDefault();

    var submission = document.getElementById('messageText');

    if (submission.value) {
      window.__context.state.socket.emit('chatMessage', {
        room: window.__context.state.roomId,
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
  }

  render() {
    return (
      <div className="container">
        <div class="row">
          <div className="chat" style={ style.chatterbox }>
            <div id='chats' style={ style.messageBox }>
              { 
                this.state.messages.map(function (messageObject, index) {
                  return <Message message={ messageObject } key={ index } />
                }) 
              }
            </div>
            <form onSubmit={ this.sendMessage }>
              <input type='text' id='messageText'></input>
              <input className='btn color1-text text-lighten-5' type='submit' value='Send'></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
};



