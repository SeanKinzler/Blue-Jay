import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions/index.jsx';
import UserSubscriptions from '../components/UserSubscriptions.jsx';

class Subscriptions extends Component {
	
	componentWillMount() {
		this.props.getUserData();
	}

	renderSubscriptions() {
		if (!this.props.subscriptions.length) {
			return (
				<div>You have no subscriptions. 
					<Link to='/search'>Go search for some!</Link>
				</div>
			)
		} else {
			return (
				<UserSubscriptions 
					subscriptions={this.props.subscriptions} 
					removeSubscription={this.props.removeSubscription}
				/>
			)
		}
	}

	render() {
		return (
			<div className='container'>
				<h1>Subscriptions</h1>
				{ this.renderSubscriptions() }
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		subscriptions: state.subscriptions.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(Subscriptions);