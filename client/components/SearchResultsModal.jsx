import React from 'react';

const SearchResultsModal = ({selectedStream, modalIsOpen, closeModal}) => {
	if (!modalIsOpen) {
		return <div></div>;
	}

	return (
		<div id="search-results-modal" className="modal modal-trigger">
		  <div className="modal-content">
		    <h4>Modal Header</h4>
		    <p>A bunch of text</p>
		  </div>
		  <div className="modal-footer">
		    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
		  </div>
		</div>
	)
}

export default SearchResultsModal;