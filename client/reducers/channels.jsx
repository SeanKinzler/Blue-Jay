import { REQUEST_CHANNELS } from '../actions/index.jsx';

const initialState = {
	data: []
}

const Channel = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_CHANNELS:
			return Object.assign({}, state, {
			    data: action.payload.body.data
			});
		default:
			return state;
	}
}

export default Channel;