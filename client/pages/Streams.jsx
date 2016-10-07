import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions/index.jsx';
import UserStreams from '../components/UserStreams.jsx';
import UserStreamsModal from '../components/UserStreamsModal.jsx';

class Streams extends Component {
	
	deleteStreamHandler(stream) {
		const prompt = prompt('Are you sure you want to delete this stream?')
		if (prompt) {
			this.props.deleteStream({ stream });
		}
	}

	editStreamHandler(stream) {
		this.props.editStream({ stream });
	}

	renderStreams() {
		if (!this.props.userStreams.data.length) {
			return (
				<p>You currently don't have any streams.
					<Link to='/create'>Create a stream here.</Link>
				</p>
			)
		}
		return (
			<div className='container'>
				<UserStreams 
					streams={ this.props.userStreams.data }
					onStreamSelect={ (stream) => { this.props.openStreamModal(stream) } }
					deleteStream={this.deleteStreamHandler }
				/>
				<UserStreamsModal 
					selectedStream={ this.props.userStreams.selectedStream }
					modalIsOpen={ this.props.userStreams.modalIsOpen }
					onRequestClose={ () => { this.props.closeStreamModal() } }
					editStream={ this.editStreamHandler } 
				/>
			</div>
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
		userStreams: state.userStreams
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(Streams);