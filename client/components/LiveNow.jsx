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
                    <Link className="valign" to={ '/' + streamObj.title }>
                      <i className={ 'valign material-icons circle ' + context.randomColor() }>{ context.randomIcon() }</i>
                    </Link>
                    <h6 className="title">
                      Title: <Link to={ '/' + streamObj.title }>{ title }</Link>
                    </h6>
                    
                    <h6>
                      Host: <Link to={ '/' + host }>{ host }</Link>
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
              <Link href='/channel/StreamOne'>
                <h6>Be the first to start streaming!</h6>
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }
}

