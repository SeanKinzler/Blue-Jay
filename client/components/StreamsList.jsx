import React from 'react';
import { Link } from 'react-router';

const StreamsList = ({streams}) => {
	
	const renderStreams = (streams) => {
		if (!streams.length) {
			return (
				<li className='collection-item'>
					<p>You have not created any streams.</p>
					<Link to='/create'>Create one here</Link>
				</li>
			)
		}
		return (
			<span>
				{ streams.map((stream, i) => {
					return (
						<li key={ i } className='collection-item avatar'>
							<i className='material-icons circle red'>loop</i>
							<span className='title'>{ stream.title }</span>
							<p>{ stream.description }</p>
						</li>
					)
				})}
				<li className='collection-item'>
					<Link to='/streams'>Manage Streams</Link>
				</li>
			</span>
		)
	}

	return (
		<ul className='collection with-header'>
			<li className='collection-header'>
				<h5>My Streams</h5>
			</li>
			{ renderStreams(streams) }			
		</ul>
	)
}

export default StreamsList;