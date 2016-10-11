import React from 'react';
import { Modal, Button } from 'react-materialize';

const SearchResultsExtended = ({searchResults, openModal, addSubscription}) => {
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
							<div className="card blue">
								<div className="card-content white-text">
									<span className="card-title">{ stream.title }</span>
									<p>{ stream.description }</p>
								</div>
								<div className="card-action">
									<div className='row'>
										<div className='col s2'>
											<i onClick={ () => { addSubscription(stream) } } className='material-icons circle green'>done</i>
										</div>
										<div className='col s2'>
											<Modal
												  header='Modal Header'
												  trigger={
												    <Button waves='light'>MODALs</Button>
												  }>
												  <div>
														<h1>{ stream.title }</h1>
														<p>{ stream.description }</p>
														<p>Subscriber count: { stream.subscriberCount }</p>
														<p>Online: { stream.online }</p>
														<p>CreatorId: { stream.CreatorId }</p>
														<p>Created: { stream.createdAt }</p>
												  </div>
												</Modal>
										</div>
										<div className='col s2'>
											<span className='white-text'>{ stream.creatorId }</span>
										</div>
										<div className='col s2'>
											<span className="badge red">{ stream.online }</span>
										</div>
										<div className='col s2'>
											<span className="badge white-text">{ stream.subscriberCount }</span>
										</div>

									</div>
								</div>
							</div>
					</div>
				)
			})}
		</div>
	)
}

export default SearchResultsExtended;