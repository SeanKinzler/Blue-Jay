import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';

class NavBar extends Component {
  
  handleSignout() {
    this.props.signOutUser();
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <li>
            <Link to='dashboard'>Dashboard</Link>
          </li>
          <li>
            <a href='#' onClick={ (e) => { e.preventDefault(); this.handleSignout(); } }>Logout</a>
          </li>
        </div>
      )
    } else {
      return (
        <li>
          <Link to='login'>Login</Link>
        </li>
      )
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper blue darken-1'>
          <Link className='brand-logo center' to='/'>BlueBird</Link>
          <ul id="nav-mobile" className="right">
              { this.renderAuthLinks() }
          </ul>       
        </div>
      </nav>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(NavBar);
