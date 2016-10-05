import React from 'react';

const SearchResultsCompact = ({searchResults, openModal}) => {
	const isOnline = (stream) => {
		if (stream.online) {
			return <span className="badge red">{ stream.online }</span>
		} else {
			return <span></span>;
		}
	}
	return (
		<div>
			{ searchResults.map((stream) => {
				return (
					<div key={stream.id} className='col s6 m4'>
						<div className="card blue">
						<a onClick={ () => { openModal(stream); } } >
							<div className="card-content white-text">
								<span className="card-title">{ stream.title }</span>
								<p>{ stream.description }</p>
							</div>
							<div className="card-action">
								<span>{ stream.creatorId }</span>
								{ isOnline(stream) }
								<span className="badge green">{ stream.subscriberCount }</span>
							</div>
						</a>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default SearchResultsCompact;