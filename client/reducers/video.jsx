import { JOIN_CHANNEL, JOIN_CHANNEL_ERROR } from '../actions/index.jsx';

const initialState = {
	socket: {},
	error: null
}

const Video = (state = initialState, action) => {
	switch (action.type) {
		case JOIN_CHANNEL:
			return Object.assign({}, state, {
			    socket: action.payload
			});
		case JOIN_CHANNEL_ERROR:
			return Object.assign({}, state, {
				error: action.payload
			})
		default:
			return state;
	}
}

export default Video;