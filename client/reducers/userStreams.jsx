import {
	REQUEST_USER_STREAMS,
	REQUEST_ERROR,
	CREATE_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
	OPEN_STREAM_MODAL,
	CLOSE_STREAM_MODAL
} from '../actions/index.jsx';

const initialState = {
	data: [],
	selectedStream: null,
	modalIsOpen: false,
	error: null
}

const UserStreams = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_USER_STREAMS:
			return Object.assign({}, state, {
				data: action.data
			})
		case REQUEST_ERROR:
			return Object.assign({}, state, {
				error: action.payload.message
			})
		case CREATE_STREAM:
			return state;
		case EDIT_STREAM:
			return state;
		case DELETE_STREAM:
			var altered = state.data.reduce((a, c) => {
					if (c.id === action.stream.id) return a;
					return a.concat([c]);
				}, [])
			return Object.assign({}, state, {
				data: altered
			})
		case OPEN_STREAM_MODAL:
			return Object.assign({}, state, {
				modalIsOpen: true,
				selectedStream: action.stream
			});
		case CLOSE_STREAM_MODAL:
			return Object.assign({}, state, {
				modalIsOpen: false,
				selectedStream: null
			});
		default:
			return state;
	}
}

export default UserStreams;