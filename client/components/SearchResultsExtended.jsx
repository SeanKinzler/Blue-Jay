import React from 'react';

const SearchResultsExtended = ({searchResults, openModal}) => {
	return (
		<div>
			{ searchResults.map((stream) => {
				return (
					<div key={stream.id} className='col s12'>
						<div className="card blue">
							<div className="card-content white-text">
								<span className="card-title">Card Title</span>
								<p>I am a very simple card. I am good at containing small bits of information.
									I am convenient because I require little markup to use effectively.</p>
							</div>
							<div className="card-action">
								<a onClick={ () => { openModal(stream); } } >This is a link</a>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default SearchResultsExtended;