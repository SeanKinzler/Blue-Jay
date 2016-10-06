import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import ChannelList from '../components/ChannelList.jsx';
class Dashboard extends Component {

	componentWillMount() {
		this.props.getStreams()
	}

	render() {
	  return (
	    <div className='container'>
	    	<div className='row'>
	    		<div className='col s12 l6'>
			    	<ChannelList />
			    </div>
			    <div className='col s12 l6'>		    
			    	<h5 className='center-align'>Subscribed</h5>
			    	<ul>
				    	<li>Super cool channel 10</li>
				    	<li>Super cool channel 11</li>
				    	<li>Super cool channel 12</li>
				    </ul>
			    </div>
			    <div className='col s12 l6'>
			    	<h5 className='center-align'>My Streams</h5>
			    	<ul>
				    	<li>You don't have any streams. Sign up here!</li>
				    </ul>
			    </div>
			    <div className='col s12 l6'>
			    	<h5 className='center-align'>Account Settings</h5>
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
		streams: state.streams.data
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(Dashboard);