import { ADD_SUBSCRIPTION, 
		REMOVE_SUBSCRIPTION,
		REQUEST_SUBSCRIPTIONS,
		SUBSCRIPTION_ERRORS } 
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
				data: action.data
			});
		case REMOVE_SUBSCRIPTION: 
			return Object.assign({}, state, {
				data: action.data
			});
		case SUBSCRIPTIONS_ERROR:
			return Object.assign({}, state, {
				error: action.error
			})
	}
}