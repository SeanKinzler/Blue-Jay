import { browserHistory } from 'react-router';
import axios from 'axios';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_STREAMS = 'REQUEST_STREAMS';
export const SEARCH_STREAMS = 'SEARCH_STREAMS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const JOIN_STREAM = 'JOIN_STREAM';
export const FILTER_STREAM_CATEGORIES = 'FILTER_STREAM_CATEGORIES';
export const FILTER_STREAM_PRICES = 'FILTER_STREAM_PRICES';
export const FILTER_STREAM_TYPES = 'FILTER_STREAM_TYPES';
export const FILTER_STREAM_DAYS = 'FILTER_STREAM_DAYS';
export const FILTER_STREAM_TIMES = 'FILTER_STREAM_TIMES';
export const TOGGLE_SEARCH_RESULTS_VIEW = 'TOGGLE_SEARCH_RESULTS_VIEW';
export const JOIN_STREAM_ERROR = 'JOIN_STREAM_ERROR';
export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const REQUEST_SUBSCRIPTIONS = 'REQUEST_SUBSCRIPTIONS';
export const SUBSCRIPTIONS_ERROR = 'SUBSCRIPTIONS_ERROR';
export const ADD_STREAM = 'ADD_STREAM';
export const EDIT_STREAM = 'EDIT_STREAM';
export const DELETE_STREAM = 'DELETE_STREAM';
export const OPEN_STREAM_MODAL = 'OPEN_STREAM_MODAL';
export const CLOSE_STREAM_MODAL = 'CLOSE_STREAM_MODAL';

export const joinStream = (socket) => {
	return {
		type: JOIN_STREAM,
		payload: socket
	}
}

export const userSignedIn = (data) => {
	localStorage.token = data.token;
	return {
		type: SIGN_IN_USER,
		username: data.username,
		token: data.token
	}
}

export const signInUser = (credentials) => {
	return (dispatch) => {
		axios({
			url: 'https://localhost:8443/users/login',
			method: 'POST',
			dataType: 'json',
			data: credentials
		})
		.then((res) => {
			dispatch(userSignedIn(res.data));
			browserHistory.push('/');
		})
		.catch((err) => {
			dispatch(authError(err));					
		})
	}
}

export const signOutUser = () => {
	browserHistory.push('/');
	localStorage.removeItem('token');
	return {
		type: SIGN_OUT_USER
	}
}

export const signUpUser = (credentials) => {
	return (dispatch) => {
		axios({
			url: 'https://localhost:8443/users/signup',
			method: 'POST',
			dataType: 'json',
			data: credentials
		})
		.then((res) => {
			dispatch(signInUser(res));
			browserHistory.push('/');
		})
		.catch((err) => {
			dispatch(authError(err));					
		})
	}
}

export const authError = (error) => {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export const requestError = (error) => {
	return {
		type: REQUEST_ERROR,
		payload: error
	}
}

export const requestStreams = (streams) => {
	return {
		type: REQUEST_STREAMS,
		data: streams.data
	}
}

export const getStreams = () => {
	return (dispatch) => {
		axios.get('https://localhost:8443/api/streams')
		.then((res) => {
			dispatch(requestStreams(res));
		})
		.catch((err) => {
			dispatch(requestError(err));
		})
	}
}

export const searchStreams = (term) => {
	return {
		type: SEARCH_STREAMS,
		term 
	}
}

export const filterStreamCategories = (categories) => {
	return {
		type: FILTER_STREAM_CATEGORIES,
		categories,
	}
}

export const filterStreamPrices = (prices) => {
	return {
		type: FILTER_STREAM_PRICES,
		prices,
	}
}

export const filterStreamTypes = (types) => {
	return {
		type: FILTER_STREAM_TYPES,
		types,
	}
}

export const filterStreamDays = (days) => {
	return {
		type: FILTER_STREAM_DAYS,
		days,
	}
}

export const filterStreamTimes = (times) => {
	return {
		type: FILTER_STREAM_TIMES,
		times,
	}
}

export const toggleSearchResultsView = (view) => {
	return {
		type: TOGGLE_SEARCH_RESULTS_VIEW,
		view,
	}
}

export const openModal = (stream) => {
	return {
		type: OPEN_MODAL,
		stream
	}
}

export const closeModal = () => {
	return {
		type: CLOSE_MODAL
	}
}

export const subscriptionsRequested = (subscriptions) => {
	return {
		type: REQUEST_SUBSCRIPTIONS,
		data: subscriptions.data
	}
}

export const subscriptionAdded = (subscriptions) => {
	return {
		type: ADD_SUBSCRIPTION,
		data: subscriptions.data
	}
}

export const subscriptionRemoved = (subscriptions) => {
	return {
		type: REMOVE_SUBSCRIPTION,
		data: subscriptions.data
	}
}

export const subscriptionError = (error) => {
	return {
		type: SUBSCRIPTIONS_ERROR
	}
}

export const requestSubscriptions = (username) => {
	return (dispatch) => {
		axios.get(`https://localhost:8443/api/users/${username}/subscriptions`)
		.then((res) => {
			dispatch(subscriptionsRequested(res));
		})
		.catch((err) => {
			dispath(subscriptionError(err));
		})
	}
}

export const addSubscription = (stream, username) => {
	return (dispatch) => {
		axios.post(`https://localhost:8443/api/users/${username}/subscriptions`,
			{ body: stream }
		)
		.then((res) => {
			dispatch(subscriptionAdded(res));
		})
		.catch((err) => {
			dispatch(requestError(err));
		})
	}
}

export const removeSubscription = (streamId, username) => {
	return (dispatch) => {
		axios.put(`https://localhost:8443/api/users/${username}/subscriptions`,
			{ body: streamId }
		)
		.then((res) => {
			dispatch(subscriptionAdded(res));
		})
		.catch((err) => {
			dispatch(requestError(err));
		})
	}
}

export const openStreamModal = (stream) => {
	return {
		type: OPEN_STREAM_MODAL,
		stream
	}
}

export const closeStreamModal = (stream) => {
	return {
		type: CLOSE_STREAM_MODAL
	}
}

const streamAdded = (streams) => {
	return {
		type: ADD_STREAM,
		data: streams
	}
}

export const addStream = (stream) => {
	return (dispatch) => {
		axios.post(`https://localhost:8443/api/streams/${stream.title}`)
		.then((res) => {
			dispatch(streamAdded(res))
		})
		.catch((err) => {
			dispatch(requestError(err))
		})
	}
}

const streamEdited = (streams) => {
	return {
		type: EDIT_STREAM,
		data: streams
	}
}

export const editStream = (stream) => {
	return (dispatch) => {
		axios.put(`https://localhost:8443/api/streams/${stream.title}`)
		.then((res) => {
			dispatch(streamEdited(res));
		})
		.catch((err) => {
			dispatch(requestError(err));
		})
	}
}

const streamDeleted = (streams) => {
	return {
		type: DELETE_STREAM,
		data: streams
	}
}

export const deleteStream = (stream) => {
	return (dispatch) => {
		axios.delete(`https://localhost:8443/api/streams/${stream.title}`)
		.then((res) => {
			dispatch(streamDeleted(res))
		})
		.catch((err) => {
			dispatch(requestError(err))
		})
	}
}