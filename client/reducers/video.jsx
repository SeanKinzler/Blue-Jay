import { JOIN_STREAM, LEAVE_STREAM, JOIN_STREAM_ERROR } from '../actions/index.jsx';

const initialState = {
	stream: null,
	error: null
}

const Video = (state = initialState, action) => {
	switch (action.type) {
		case JOIN_STREAM:
			return Object.assign({}, state, {
			    stream: action.stream
			});
		case LEAVE_STREAM:
			return Object.assign({}, state, {
			    stream: null
			});			
		case JOIN_STREAM_ERROR:
			return Object.assign({}, state, {
				error: action.payload
			})
		default:
			return state;
	}
}

export default Video;