import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';

class Signup extends Component {

	signUpHandler(values) {
		this.props.signUpUser(values);
	}

	render() {
		return (
			<div className='container'>					
				<div className='row'>
					<form onSubmit={ (e) => { e.preventDefault(); this.signUpHandler(e.target); } } className='col s12'>
				    <div className='row'>
				      <div className='input-field col s6'>
				        <input id='first_name' type='text' className='validate' />
				        <label htmlFor='first_name'>First Name</label>
				      </div>
				      <div className='input-field col s6'>
				        <input id='last_name' type='text' className='validate' />
				        <label htmlFor='last_name'>Last Name</label>
				      </div>
				    </div>
				    <div className='row'>
				      <div className='input-field col s6'>
				        <input id='email' type='email' className='validate' />
				        <label htmlFor='email'>Email</label>
				      </div>
				      <div className='input-field col s6'>
				        <input id='username' type='text' className='validate' />
				        <label htmlFor='username'>Username</label>
				      </div>
				    </div>
				    <div className='row'>
				      <div className='input-field col s6'>
				        <input id='password' type='password' className='validate' />
				        <label htmlFor='password'>Password</label>
				      </div>
				      <div className='input-field col s6'>
				        <input id='confirm_password' type='password' className='validate' />
				        <label htmlFor='confirm_password'>Confirm Password</label>
				      </div>
				    </div>
				    <div className='row'>
				    	<div className='input-field col s6' >
				    		<input className='btn' type='submit' value='Submit' />
				    	</div>
				    </div>
				  </form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    authenticationError: state.auth.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(Signup);