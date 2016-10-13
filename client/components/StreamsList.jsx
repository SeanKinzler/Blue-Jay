import React from 'react';
import { Link } from 'react-router';
import allIcons from '../lib/allIcons.js';
import allColors from '../lib/allColors.js';
import urlHelper from '../utils/urlHelper.jsx';
import checkLength from '../utils/lengthHelper.jsx';

const StreamsList = ({streams}) => {
  const renderStreams = (streams) => {
		if (!streams.length) {
			return (
				<li className='collection-item color1'>
					<p>You have not created any streams.</p>
					<Link to='/create'>Create one here</Link>
				</li>
			)
		}
		return (
			<span>
				{ streams.map((stream, i) => {
					return (
						<li key={ i } className='collection-item avatar color1'>
							<i className={`material-icons circle ${ allColors() }`}>{ allIcons() }</i>
							<Link to={ `${ stream.username + '/' + urlHelper.slugify(stream.title) }` } >
								<h3 className='title'>{ checkLength(stream.title, 25) }</h3>
							</Link>
							<p>{ checkLength(stream.description, 40) }</p>
					    <Link to={ `${ stream.username + '/' + urlHelper.slugify(stream.title) }` } className="secondary-content">
						    <i className="material-icons color1 lighten-1">contact_phone</i>
						  </Link>
						</li>
					)
				})}
				<li className='collection-item color1'>
					<Link to='/streams'>Manage Streams</Link>
				</li>
			</span>
		)
	}

	return (
		<ul className='collection with-header'>
			<li className='collection-header color1'>
				<h5>My Streams</h5>
			</li>
			{ renderStreams(streams) }			
		</ul>
	)
}

export default StreamsList;
