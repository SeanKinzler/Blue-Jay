import { REQUEST_CHANNELS, 
		REQUEST_ERROR, 
		SEARCH_CHANNELS, 
		FILTER_CHANNEL_CATEGORIES, 
		FILTER_CHANNEL_PRICES,
		FILTER_CHANNEL_TYPES } 
from '../actions/index.jsx';

const initialState = {
	data: [],
	term: null,
	categories: [],
	prices: [],
	types: [],
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
		case SEARCH_CHANNELS:
			return Object.assign({}, state, {
				term: action.term
			})
		case FILTER_CHANNEL_CATEGORIES:
			return Object.assign({}, state, {
				categories: action.categories
			})
		case FILTER_CHANNEL_PRICES:
			return Object.assign({}, state, {
				prices: action.prices
			})
		case FILTER_CHANNEL_TYPES:
			return Object.assign({}, state, {
				types: action.types
			})
		default:
			return state;
	}
}

export default Channel;