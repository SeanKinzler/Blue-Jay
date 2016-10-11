import React from 'react';
import { Button, Modal } from 'react-materialize'
import { SearchResultsModal } from './SearchResultsModal.jsx'

const SearchResultsCompact = ({searchResults, openModal, addSubscription, selectedStream, modalIsOpen, onRequestClose}) => {
	const isOnline = (stream) => {
		if (stream.online) {
			return <span className="badge red">{ stream.online }</span>
		} else {
			return <span></span>;
		}
	}

	///<div onClick={ () => { openModal(stream); } } className='btn'>Details</div>
	return (
		<div>
			{ searchResults.map((stream) => {
				return (
					<div key={stream.id} className='col s6 m4'>
						<div className="card blue">
							<div className="card-content white-text">
								<span className="card-title">{ stream.title }</span>
								<p>{ stream.description }</p>
							</div>
							<div className="card-action">
								<i onClick={ () => { addSubscription(stream) } } className='material-icons circle green'>done</i>
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
								<span>{ stream.creatorId }</span>
								<span className="badge purple">{ isOnline(stream) }</span>
								<span className="badge green">{ stream.subscriberCount }</span>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default SearchResultsCompact;