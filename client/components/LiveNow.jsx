import React, { Component } from 'react';
import {Link} from 'react-router';
import allIcons from '../lib/allIcons.js';
import allColors from '../lib/allColors.js';

export default class LiveNow extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      streams: [],
      socket: props.socket,
    };

    props.socket.on('allStreams', (results) => {
      this.state.streams = results.sort(function (b, a) {
        return a.size - b.size;
      });

      this.forceUpdate();
    });

    props.socket.emit('getStreams');

  }

  randomColor() {
    return allColors[Math.floor(Math.random() * allColors.length)];
  }

  randomIcon() {
    return allIcons[Math.floor(Math.random() * allIcons.length)];
  }

  componentWillMount() {
  }

  render() {
    var context = this;

    if (this.state.streams.length) {

      return (

        <div>
          <ul className="collection with-header">
            <li className="collection-header">
              <h5 className='align-center'>Live Now</h5>
            </li>
          </ul>
          <ul className='collection'>
            { 
              this.state.streams.map(function (streamObj, index) {

                var title = streamObj.title.slice(streamObj.title.lastIndexOf('/') + 1);
                var host = streamObj.title.slice(0, streamObj.title.indexOf('/'));

                return ( 
                  <li className="collection-item avatar" key={ index }>
                    <a className="valign" href={ '/' + streamObj.title }>
                      <i className={ 'valign material-icons circle ' + context.randomColor() }>{ context.randomIcon() }</i>
                    </a>
                    <h6 className="title">
                      Title: <a href={ '/' + streamObj.title }>{ title }</a>
                    </h6>
                    
                    <h6>
                      Host: <a href={ '/' + host }>{ host }</a>
                    </h6>
                    
                    <h7>
                      Viewers: { streamObj.size }
                    </h7>
                  </li>
                );
              })
            }
          </ul>      
        </div>
      );

    } else {

      return (

        <div>
          <ul className="collection with-header">
            <li className="collection-header">
              <h5 className='align-center'>Live Now</h5>
            </li>
          </ul>
          <ul className="collection with-header">
            <li className="collection-header">
              <h5>The are no streams right now.</h5>
              <a href='/channel/StreamOne'>
                <h6>Be the first to start streaming!</h6>
              </a>
            </li>
          </ul>
        </div>
      );
    }
  }
}

