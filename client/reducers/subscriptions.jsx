import { ADD_SUBSCRIPTION, 
		REMOVE_SUBSCRIPTION,
		REQUEST_SUBSCRIPTIONS,
		SUBSCRIPTIONS_ERROR } 
from '../actions/index.jsx';

const initialState = {
	data: [],
	error: null
}

const Subscriptions = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SUBSCRIPTIONS: 
			return Object.assign({}, state, {
				data: action.data
			});
		case ADD_SUBSCRIPTION:
			return Object.assign({}, state, {
				data: state.data.concat([action.stream])
			})
		case REMOVE_SUBSCRIPTION: 
			var altered = state.data.reduce((a, c) => {
					if (c.title === action.stream.title) return a;
					return a.concat([c]);
				}, [])
			return Object.assign({}, state, {
				data: altered
			})
		case SUBSCRIPTIONS_ERROR:
			return Object.assign({}, state, {
				error: action.error
			})
		default:
			return state;
	}
}

export default Subscriptions;