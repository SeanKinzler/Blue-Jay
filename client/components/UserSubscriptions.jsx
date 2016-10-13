import React from 'react';
import { Link } from 'react-router';
import urlHelper from '../utils/urlHelper.jsx';

const UserSubscriptions = ({subscriptions, removeSubscription}) => {
	const isOnline = (stream) => {
		if (stream.online) {
			return <span className="badge red">{ stream.online }</span>
		} else {
			return <span></span>;
		}
	}
	return (
		<div>
			{ subscriptions.map((stream) => {
				return (
					<div key={stream.title} className='col s12'>
							<div className="card">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
									<span>{ stream.creatorName }</span>
									<Link 
										to={`${stream.creatorName + '/' + urlHelper.slugify(stream.title)}`} 
										className="secondary-content white-text"><i className="material-icons">contact_phone</i></Link>
								</div>
								<div className="card-action">
									<span>{ stream.creatorId }</span>
									{ isOnline(stream) }
									<span className="badge">{ stream.subscriberCount }</span>
									<span onClick={ () => { removeSubscription(stream) } }>Remove</span>
								</div>
							</div>
					</div>
				)
			})}
		</div>
	)
}

export default UserSubscriptions;