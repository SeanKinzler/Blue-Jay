import {
	REQUEST_STREAMS,
	REQUEST_ERROR,
	ADD_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
	OPEN_MODAL,
	CLOSE_MODAL
} from '../actions/index.jsx';

const initialState = {
	data: [],
	selectedStream: null,
	modalOpen: false,
	error: null
}

const UserStreams = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_STREAMS:
			return Object.assign({}, state, {
				data: action.data
			})
		case REQUEST_ERROR:
			return Object.assign({}, state, {
				error: action.payload.message
			})
		case ADD_STREAM:
			return Object.assign({}, state, {
				data: action.data
			})
		case EDIT_STREAM:
			return Object.assign({}, state, {
				data: action.data
			})
		case DELETE_STREAM:
			return Object.assign({}, state, {
				data: action.data
			})
		case OPEN_MODAL:
			return Object.assign({}, state, {
				modalOpen: true,
				selectedStream: action.stream
			});
		case CLOSE_MODAL:
			return Object.assign({}, state, {
				modalOpen: false,
				selectedStream: null
			});
		default:
			return state;
	}
}