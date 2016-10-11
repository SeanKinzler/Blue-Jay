import React from 'react';
// import Modal from 'react-modal';
import { Button, Modal } from 'react-materialize';
import { SearchResultsModalStyling } from '../styles.js';

const SearchResultsModal = ({selectedStream, modalIsOpen, onRequestClose, openModal, stream}) => {
	if (!modalIsOpen) {
		return <div></div>;
	}
	console.log(stream);
	return (
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

	)
}


export default SearchResultsModal;