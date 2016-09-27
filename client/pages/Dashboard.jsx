import React, { Component } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import {Link} from 'react-router';

export default () => {
  return (
    <div className='container'>
    	<div className='row'>
    		<div className='col s12 l6'>
		    	<h4>Upcoming</h4>
		    	<ul>
		    		<li>Time: Now - Channel: One - Topic</li>
		    		<li>Time: Tomorrow 12:30pm - Channel: Two - Topic</li>
		    		<li>Time: Saturday 4:00pm - Channel: Three - Topic</li>
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