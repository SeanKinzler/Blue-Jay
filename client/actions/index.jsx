import { browserHistory } from 'react-router';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const signInUser = () => {
	browserHistory.push('/');
	return {
		type: SIGN_IN_USER
	}
}

export const signOutUser = () => {
	browserHistory.push('/');
	return {
		type: SIGN_OUT_USER
	}
}