import React from 'react';
import { Link } from 'react-router';
import allIcons from '../lib/allIcons.js';
import allColors from '../lib/allColors.js';
import urlHelper from '../utils/urlHelper.jsx';

const StreamsList = ({streams}) => {
	
	const renderStreams = (streams) => {
		if (!streams.length) {
			return (
				<li className='collection-item color2'>
					<p>You have not created any streams.</p>
					<Link to='/create'>Create one here</Link>
				</li>
			)
		}
		return (
			<span>
				{ streams.map((stream, i) => {
					return (
						<li key={ i } className='collection-item avatar color2'>
							<i className={`material-icons circle ${ allColors() }`}>{ allIcons() }</i>
							<Link to={ `${ localStorage.username + '/' + urlHelper.slugify(stream.title) }` } >
								<h3 className='title'>{ stream.title }</h3>
							</Link>
							<p>{ stream.description }</p>
					    <Link to={ `${ localStorage.username + '/' + urlHelper.slugify(stream.title) }` } className="secondary-content">
						    <i className="material-icons color2 lighten-1">contact_phone</i>
						  </Link>
						</li>
					)
				})}
				<li className='collection-item color2'>
					<Link to='/streams'>Manage Streams</Link>
				</li>
			</span>
		)
	}

	return (
		<ul className='collection with-header'>
			<li className='collection-header color2'>
				<h5>My Streams</h5>
			</li>
			{ renderStreams(streams) }			
		</ul>
	)
}

export default StreamsList;