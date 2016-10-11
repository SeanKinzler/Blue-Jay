import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';
import { browserHistory } from 'react-router';

class JwtPage extends Component {
  

  componentDidMount() {
    localStorage.token = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
    this.props.userSignedIn(localStorage.token);
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

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, Actions)(JwtPage);