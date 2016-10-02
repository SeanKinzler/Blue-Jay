import { browserHistory } from 'react-router';
import axios from 'axios';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const SEARCH_CHANNELS = 'SEARCH_CHANNELS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const JOIN_CHANNEL = 'JOIN_CHANNEL';
export const JOIN_CHANNEL_ERROR = 'JOIN_CHANNEL_ERROR';

export const joinChannel = (socket) => {
	return {
		type: JOIN_CHANNEL,
		payload: socket
	}
}

export const signInUser = (credentials) => {
	browserHistory.push('/');
	return {
		type: SIGN_IN_USER,
		payload: credentials.username
	}
}

export const signOutUser = () => {
	browserHistory.push('/');
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
			dispatch(signInUser());
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

export const requestChannels = (channels) => {
	return {
		type: REQUEST_CHANNELS,
		data: channels
	}
}

export const getChannels = () => {
	console.log('requesting channels')
	return (dispatch) => {
		axios.get('https://localhost:8443/classes/all')
		.then((res) => {
			dispatch(requestChannels(res));
		})
		.catch((err) => {
			dispatch(requestError(err));
		})
	}
}

export const searchChannels = (term) => {
	return {
		type: SEARCH_CHANNELS,
		term: term 
	}
}