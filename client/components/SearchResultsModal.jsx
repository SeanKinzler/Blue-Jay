import React from 'react';
import Modal from 'react-modal';
const SearchResultsModal = ({selectedStream, modalIsOpen, onRequestClose}) => {
	if (!modalIsOpen) {
		return <div></div>;
	}

	return (
		<Modal
		  isOpen={ modalIsOpen }
		  onRequestClose={ onRequestClose }>
		  <div>
		    <p><strong>Source:</strong>Body of my modal</p>

		    <button onClick={ onRequestClose }>close</button>
		  </div>
		</Modal>
	)
}

export default SearchResultsModal;