import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link } from 'react-router';
import * as Actions from '../actions/index.jsx';
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx';

class App extends Component {

  signOutHandler() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div>
        <NavBar 
          signOut={this.signOutHandler.bind(this)}
        />
        { this.props.children } 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(App);