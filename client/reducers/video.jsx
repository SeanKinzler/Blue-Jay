import { 
	JOIN_STREAM, 
	LEAVE_STREAM, 
	JOIN_STREAM_ERROR,
	REQUEST_STREAM_INFO_ERROR 
} from '../actions/index.jsx';

const initialState = {
	stream: null,
	streamInfoError: null,
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
		case REQUEST_STREAM_INFO_ERROR:
			return Object.assign({}, state, {
			  streamInfoError: action.error
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