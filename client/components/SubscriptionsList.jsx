import React from 'react';
import {Link} from 'react-router';

export default ({subscriptions}) => {
	return (
		<ul className="collection with-header">
		  <li className='collection-header'>
		  	<h5>Subscriptions</h5>
		  </li>

		  { subscriptions.map((sub) => {
		  	return (
				  <li className="collection-item avatar">
				    <i className="material-icons circle blue">loop</i>
				    <span className="title">{ sub.title }</span>
				    <p>{ sub.description }
				    </p>
				    <Link to='username/title' className="secondary-content"><i className="material-icons">contact_phone</i></Link>
				  </li>
		  	)
		  })}


		  <li className="collection-header">
			<Link to='subscriptions'>
				<strong>All My Subscriptions</strong>
			</Link>
		  </li>		  
		</ul>
	)
}