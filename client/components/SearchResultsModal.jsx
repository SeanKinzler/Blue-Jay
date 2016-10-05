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
		<div id="modal1" className="modal">
		    <div className="modal-content">
		      <h4>Modal Header</h4>
		      <p>A bunch of text</p>
		    </div>
		    <div className="modal-footer">
		    <button className='btn modal-action modal-close waves-effect waves-green btn-flat' onClick={ onRequestClose }>close</button>
		    </div>
		  </div>
		</Modal>
	)
}

export default SearchResultsModal;