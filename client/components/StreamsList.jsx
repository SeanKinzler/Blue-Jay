import React from 'react';
import { Link } from 'react-router';
import allIcons from '../lib/allIcons.js';
import allColors from '../lib/allColors.js';
import urlHelper from '../utils/urlHelper.jsx';

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
							<i className={`material-icons circle ${ allColors() }`}>{ allIcons() }</i>
							<Link to={ `${ stream.username + '/' + urlHelper.slugify(stream.title) }` } >
								<h3 className='title'>{ stream.title }</h3>
							</Link>
							<p>{ stream.description }</p>
					    <Link to={ `${ stream.username + '/' + urlHelper.slugify(stream.title) }` } className="secondary-content">
						    <i className="material-icons">contact_phone</i>
						  </Link>
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