import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';


const RequireAuth = (WrappedComponent) => {
  class Auth extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        // browserHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Auth);
}

export default RequireAuth;