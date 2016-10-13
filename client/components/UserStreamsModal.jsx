import React from 'react';
import Modal from 'react-modal';
import { SearchResultsModalStyling } from '../styles.js';

const UserStreamsModal = ({selectedStream, modalIsOpen, onRequestClose, editStream}) => {
	if (!modalIsOpen) {
		return <div></div>;
	}

	return (
		<Modal
		  isOpen={ modalIsOpen }
		  onRequestClose={ onRequestClose }
		  style={ SearchResultsModalStyling }
		>
			<div>
				<form onSubmit={ editStream }>
					<input type='text' defaultValue={ selectedStream.title } name='title' />
					<input type='text' defaultValue={ selectedStream.description } name='description' />
					<input type='submit' value='Submit' className='btn' />
				</form>
			</div>
			<a className='btn' onClick={ onRequestClose }>Cancel</a>
		</Modal>
	)
}

export default UserStreamsModal;