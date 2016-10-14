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
				<li className='collection-item transparent componentGradient'>
					<p>You have not created any streams.</p>
					<Link to='/create'>Create one here</Link>
				</li>
			)
		}
		return (
			<span>
				{ streams.map((stream, i) => {
					return (
						<li key={ i } className='collection-item avatar transparent componentGradient'>
							<i className={`material-icons circle ${ allColors() }`}>{ allIcons() }</i>
							<Link to={ `${ stream.username + '/' + urlHelper.slugify(stream.title) }` } >
								<h3 className='title'>{ checkLength(stream.title, 25) }</h3>
							</Link>
							<p>{ checkLength(stream.description, 40) }</p>
					    <Link to={ `${ stream.username + '/' + urlHelper.slugify(stream.title) }` } className="secondary-content">
						    <i className="material-icons color1-text text-lighten-5">contact_phone</i>
						  </Link>
						</li>
					)
				})}
				<li className='collection-item transparent componentGradient'>
					<Link to='/streams'>Manage Streams</Link>
				</li>
			</span>
		)
	}

	return (
		<ul className='collection with-header'>
			<li className='collection-header transparent componentGradient'>
				<h5 className='color1-text text-lighten-5'>My Streams</h5>
			</li>
			{ renderStreams(streams) }			
		</ul>
	)
}

export default StreamsList;
