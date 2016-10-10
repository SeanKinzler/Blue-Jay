import React, { Component } from 'react';
import Video from '../components/Video.jsx';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

export default class JwtPage extends Component {
  

  componentDidMount() {
    localStorage.token = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
    browserHistory.push('/');
  }


  render() {

    return (
      <div className=''>
        <h4 className='center-align'>Redirecting...</h4>
      </div>
    );
  }
}