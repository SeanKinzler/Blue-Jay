import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';

class Dashboard extends Component {

	componentWillMount() {
		this.props.getChannels()
	}

	render() {
	  return (
	    <div className='container'>
	    	<div className='row'>
	    		<div className='col s12 l6'>
			    	<h4>Upcoming</h4>
			    	<ul>
			    		<li>
			    			<Link to='channel/one'>Time: Now - Channel: One - Topic</Link>
			    		</li>
			    		<li>
			    			<Link to='channel/two'>Time: Tomorrow 12:30pm - Channel: Two - Topic</Link>
			    		</li>
			    		<li>
			    			<Link to='channel/three'>Time: Saturday 4:00pm - Channel: Three - Topic</Link>
			    		</li>
			    	</ul>
			    </div>
			    <div className='col s12 l6'>		    
			    	<h4>Subscribed</h4>
			    	<ul>
				    	<li>Super cool channel 10</li>
				    	<li>Super cool channel 11</li>
				    	<li>Super cool channel 12</li>
				    </ul>
			    </div>
			    <div className='col s12 l6'>
			    	<h4>My Channels</h4>
			    	<ul>
				    	<li>You don't have any channels. Sign up here!</li>
				    </ul>
			    </div>
			    <div className='col s12 l6'>
			    	<h4>Account Settings</h4>
			    	<ul>
				    	<li>Profile</li>
				    	<li>Notifications</li>
				    	<li>Payments</li>
				    </ul>
			    </div>
	    	</div>
	    </div>
	  )
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.username,
		channels: state.channels.data
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(Dashboard);