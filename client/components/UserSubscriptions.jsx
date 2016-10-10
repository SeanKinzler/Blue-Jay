import React from 'react';
import { Link } from 'react-router';

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
					<div key={stream.id} className='col s12'>
							<div className="card blue">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
									<span>*Stream titles don't work well as urls. Use slugs.</span>
									<Link to='stream/one' className="secondary-content"><i className="material-icons">contact_phone</i></Link>
								</div>
								<div className="card-action">
									<span>{ stream.creatorId }</span>
									{ isOnline(stream) }
									<span className="badge green">{ stream.subscriberCount }</span>
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