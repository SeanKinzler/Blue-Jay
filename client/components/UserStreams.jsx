import React from 'react';
import {Link} from 'react-router';
import urlUtil from '../utils/urlHelper.jsx';

const UserStreams = ({streams, deleteStream, onStreamSelect}) => {
	return (
		<div>
			{ streams.map((stream) => {
				return (
					<div key={stream.id} className='col s12'>
							<div className="card blue">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
								</div>
								<div className="card-action">
									<span className="badge green">{ stream.subscriberCount }</span>
									<Link to={ localStorage.username + '/' + urlUtil.slugify(stream.title) }>Start Streaming</Link>
									<a onClick={ () => { onStreamSelect(stream); } }>Edit Stream</a>
									<a onClick={ () => { deleteStream(stream); } }>Delete Stream</a>
								</div>
							</div>
					</div>
				)
			})}
			<div>
				<Link to='/create'>
					<h5>Create new stream</h5>
				</Link>
			</div>
		</div>
	)
}

export default UserStreams;