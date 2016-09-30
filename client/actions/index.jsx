import { browserHistory } from 'react-router';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const signInUser = () => {
	// browserHistory.push('/');
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

export const signUpUser = (values) => {
		console.log('values from action:', values)
	return (dispatch) => {
		// AJAX CALL TO SIGN UP API ENDPOINT
		// ON SUCCESS
		dispatch(signInUser());
	}
	
	// browserHistory.push('/');
	return {
		type: SIGN_UP_USER
	}
}

// export function signUpUser(credentials) {
//   return function(dispatch) {
//     ref.createUser({
//       email: credentials.email,
//       password: credentials.password
//     }, function (error, userData) {
//       if (error) {
//         dispatch(authError(error));
//       } else {
//         dispatch(signInUser(credentials));
//       }
//     });
//   }
// }