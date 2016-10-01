import { REQUEST_CHANNELS, REQUEST_ERROR } from '../actions/index.jsx';

const initialState = {
	data: [],
	error: null
}

const Channel = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_CHANNELS:
			return Object.assign({}, state, {
			    data: action.payload.body.data
			});
		case REQUEST_ERROR:
			return Object.assign({}, state, {
				error: action.payload.message
			})
		default:
			return state;
	}
}

export default Channel;