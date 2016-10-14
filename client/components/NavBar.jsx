import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';

class NavBar extends Component {
  
  constructor(props) {
    super(props);
  }

  renderAuthLinks() {
    if (localStorage.token) {
      return (
        <span>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <a href='#' onClick={ (e) => { e.preventDefault(); this.props.signOut(); } }>Logout</a>
          </li>
        </span>
      )
    } else {
      return (
        <li>
          <Link to='/login' className='color1-text text-lighten-5'>Login</Link>
        </li>
      )
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper transparent'>
          <Link className='brand-logo center color1-text text-lighten-5' to='/'>BlueJay</Link>
          <ul id="nav-mobile" className='right'>
            <li>
              <Link to='/search' className='color1-text text-lighten-5'>Search</Link>
            </li>
            { this.renderAuthLinks() }
          </ul>       
        </div>
      </nav>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, Actions)(NavBar);
