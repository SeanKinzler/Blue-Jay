import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';

class Subscriptions extends Component {
	getSubscriptions() {
		// this.props.requestSubscriptions(this.props.auth.username)
	}

	render() {
		return (
			<div className='container'>
				<h1>Subscriptions</h1>
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		subscriptions: state.subscriptions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(Subscriptions);