import { REQUEST_STREAMS, 
		REQUEST_ERROR, 
		SEARCH_STREAMS, 
		FILTER_STREAM_CATEGORIES, 
		FILTER_STREAM_PRICES,
		FILTER_STREAM_TYPES,
		FILTER_STREAM_DAYS,
		FILTER_STREAM_TIMES,
		TOGGLE_SEARCH_RESULTS_VIEW } 
from '../actions/index.jsx';

const initialState = {
	data: [],
	term: null,
	categories: [],
	prices: [],
	types: [],
	days: [],
	times: [],
	view: 'compact',
	error: null
}

const Stream = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_STREAMS:
			return Object.assign({}, state, {
			    data: action.payload.body.data
			});
		case REQUEST_ERROR:
			return Object.assign({}, state, {
				error: action.payload.message
			})
		case SEARCH_STREAMS:
			return Object.assign({}, state, {
				term: action.term
			})
		case FILTER_STREAM_CATEGORIES:
			return Object.assign({}, state, {
				categories: action.categories
			})
		case FILTER_STREAM_PRICES:
			return Object.assign({}, state, {
				prices: action.prices
			})
		case FILTER_STREAM_TYPES:
			return Object.assign({}, state, {
				types: action.types
			})
		case FILTER_STREAM_DAYS:
			return Object.assign({}, state, {
				days: action.days
			})
		case FILTER_STREAM_TIMES:
			return Object.assign({}, state, {
				times: action.times
			})
		case TOGGLE_SEARCH_RESULTS_VIEW:
			return Object.assign({}, state, {
				view: action.view
			})			
		default:
			return state;
	}
}

export default Stream;