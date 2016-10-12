import React, { Component } from 'react';
import Video from '../components/Video.jsx';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import styles from '../styles';

export default class NoMedia extends Component {

  render() {

    return (
      <div className=''>
        <h4 className='center-align' style={ styles.googleLogin }>
          Working camera & microphone not detected.
        </h4>
      </div>
    );
  }
}