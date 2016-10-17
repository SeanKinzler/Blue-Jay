import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';
import { browserHistory } from 'react-router';

class JwtPage extends Component {
  componentDidMount() {
    localStorage.token = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
    // may be used for login redirect
    // const query = window.location.search.split('=');
    // Performs redirect based on url query parameters (if provided)
    // if (query[1] && query[1].length) {
    //   const url = query[1].replace(/%2F/g, '/');
    //   browserHistory.push(url);
    // } else {
    //   browserHistory.push('/');    
    // }
    browserHistory.push('/');    
    this.props.userSignedIn(localStorage.token);
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