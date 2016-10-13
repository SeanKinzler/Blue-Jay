import React from 'react';
import { Link } from 'react-router';
import urlHelper from '../utils/urlHelper.jsx';
import checkLength from '../utils/lengthHelper.jsx';

const UserSubscriptions = ({subscriptions, removeSubscription}) => {
	const isOnline = (stream) => {
		if (stream.online === 'true') {
			return <i className="material-icons color1-text text-lighten-5">volume_up</i>;
		} else {
			return <i className="material-icons color1-text text-lighten-5">volume_off</i>;
		}
	}
	return (
		<div>
			{ subscriptions.map((stream) => {
				return (
					<ul key={stream.title} className='collection with-header col s12'>
							<li className="collection-header">
								<Link to={`${stream.creatorName + '/' + urlHelper.slugify(stream.title)}`}>
									<h5>{ checkLength(stream.title, 40) }</h5>
								</Link>
								<p>{ stream.description }</p>
							</li>
							<li className="collection-item">
								<table className="centered">
									<tbody>
										<tr>
											<td>{ checkLength(stream.creatorName, 30) }</td>
											<td>{ isOnline(stream) }</td>
											<td><i className="material-icons color1-text text-lighten-5">supervisor_account</i><br/>{ stream.subscriberCount }</td>
											<td><span onClick={ () => { removeSubscription(stream) } }>Remove</span></td>
										</tr>
									</tbody>
								</table>
							</li>
					</ul>
				)
			})}
		</div>
	)
}

export default UserSubscriptions;