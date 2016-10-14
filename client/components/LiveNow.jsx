import React, { Component } from 'react';
import {Link} from 'react-router';
import randomIcon from '../lib/allIcons.js';
import randomColor from '../lib/allColors.js';
import urlUtil from '../utils/urlHelper.jsx';

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

  componentWillMount() {
  }

  render() {
    var context = this;

    if (this.state.streams.length) {

      return (

        <div>
          <ul className="collection with-header">
            <li className="collection-header transparent componentGradient">
              <h5 className='align-center color1-text text-lighten-5'>Live Now</h5>
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
                      <i className={ 'valign material-icons circle ' + randomColor() }>{ randomIcon() }</i>
                    </Link>
                    <h6 className="title">
                      Title: <Link to={ '/' + urlUtil.slugify(streamObj.title) }>{ title }</Link>
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
            <li className="collection-header transparent componentGradient">
              <h5 className='align-center color1-text text-lighten-5'>Live Now</h5>
            </li>
          </ul>
          <ul className="collection with-header">
            <li className="collection-header transparent componentGradient">
              <h5 className="color1-text text-lighten-5">The are no streams right now.</h5>
              <Link href='/streams'>
                <h6 className="color1-text text-lighten-5">Be the first to start streaming!</h6>
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }
}

