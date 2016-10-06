import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions/index.jsx';
import UserStreams from '../components/UserS.jsx';
import UserStreamsModal from '../components/UserStreamsModal.jsx';

class Steams extends Component {
	
	deleteStreamHandler(stream) {
		const prompt = prompt('Are you sure you want to delete this stream?')
		if (prompt) {
			this.props.actions.deleteStream({ stream });
		}
	}

	editStreamHandler(stream) {
		this.props.actions.editStream({ stream });
	}

	renderStreams() {
		if (!this.props.streams.length) {
			return (
				<p>You currently don't have any streams.
					<Link to='/create'>Create a stream here.</Link>
				</p>
			)
		}
		return (
			<UserStreamsModal 
				selectedStream={ this.props.streams.selectedStream }
				modalIsOpen={ this.props.streams.modalIsOpen }
				onRequestClose={ () => { this.props.actions.closeModal() } }
				editStream={ this.editStreamHandler } 
			/>
			<UserStreams 
				streams={ this.props.streams }
				onStreamSelect={ (stream) => { this.props.actions.openModal(stream) } }
				deleteStream={this.deleteStreamHandler }
			/>
		)
	}

	render() {
		return (
			<div className='container'>
				{ this.renderStreams() }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		streams: state.streams.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(Streams);