import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions/index.jsx';
import styles from '../styles';

class Login extends Component {

  // parseUrl() {
  //   let url = '/google/login';
  //   const query = window.location.search.split('=');
  //   if (query[1] && query[1].length) {
  //     url += '?next='.concat(query[1].replace(/%2F/g, '/'));
  //   }
  //   return url;
  // }

  signInHandler(form) {
    this.props.signInUser({
      username: form.username.value,
      password: form.password.value
    });
  }

  render() {
    return (
      <div>
        <div className='center-align' style={ styles.googleLogin }>
          <a href={ '/google/login' } >
             <button className="btn waves-effect waves-light" type="submit" name="action">
              Log in with Google
             </button>
           </a>
         </div>
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

export default connect(mapStateToProps, Actions)(Login);
