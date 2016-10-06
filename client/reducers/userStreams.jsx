import {
	REQUEST_STREAMS,
	REQUEST_ERROR,
	EDIT_STREAM,
	DELETE_STREAM,
	MODAL_OPEN,
	MODAL_CLOSE
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
		case EDIT_STREAM:
			return Object.assign({}, state, {
				data: action.data
			})
		case DELETE_STREAM:
			return Object.assign({}, state, {
				data: action.data
			})
		case MODAL_OPEN:
			return Object.assign({}, state, {
				modalOpen: true,
				selectedStream: action.stream
			});
		case MODAL_CLOSE:
			return Object.assign({}, state, {
				modalOpen: false,
				selectedStream: null
			});
		default:
			return state;
	}
}