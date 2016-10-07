import { SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER, AUTH_ERROR } from '../actions/index.jsx';

const initialState = {
	authenticated: false,
	username: '',
	token: '',
	error: null
}

const Auth = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_USER:
			return Object.assign({}, state, {
				authenticated: true,
				username: action.username,
				token: action.token,
				error: false
			});
		case SIGN_OUT_USER:
			return Object.assign({}, state, {
				authenticated: false,
				username: '',
				token: '',
				error: false
			});
		case SIGN_UP_USER:
			return Object.assign({}, state, {
				authenticated: true,
				error: false
			});			
		case AUTH_ERROR:
			return Object.assign({}, state, {
				error: action.payload.message
			});
		default:
			return state;
	}
}

export default Auth;