import React from 'react';

const SearchResultsExtended = ({searchResults, openModal}) => {
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
					<div key={stream.id} className='col s12'>
						<a onClick={ () => { openModal(stream); } } >
							<div className="card blue">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
								</div>
								<div className="card-action">
									<span>{ stream.creatorId }</span>
									{ isOnline(stream) }
									<span className="badge green">{ stream.subscriberCount }</span>
								</div>
							</div>
						</a>
					</div>
				)
			})}
		</div>
	)
}

export default SearchResultsExtended;