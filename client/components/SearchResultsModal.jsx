import React from 'react';
import Modal from 'react-modal';
import { SearchResultsModalStyling } from '../styles.js';

const SearchResultsModal = ({selectedStream, modalIsOpen, onRequestClose}) => {
	if (!modalIsOpen) {
		return <div></div>;
	}

	return (
		<Modal
		  isOpen={ modalIsOpen }
		  onRequestClose={ onRequestClose }
		  style={SearchResultsModalStyling}
		>
			<div>
				<h1>{ selectedStream.title }</h1>
				<p>{ selectedStream.description }</p>
				<p>Subscriber count: { selectedStream.subscriberCount }</p>
				<p>Online: { selectedStream.online }</p>
				<p>CreatorId: { selectedStream.CreatorId }</p>
				<p>Created: { selectedStream.createdAt }</p>
			</div>
			<a className='btn blue' onClick={ onRequestClose }>Close</a>
		</Modal>
	)
}

export default SearchResultsModal;