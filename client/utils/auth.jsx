import axios from 'axios';

const requireAuth = (nextState, replace, callback) => {
	axios.defaults.headers.common['jwt'] = localStorage.token;
	axios.post('https://localhost:8443/api/authenticated')
	.then((res) => {
		callback()
	})
	.catch((err) => {
		replace({
	    pathname: '/login',
	    state: { nextPathname: nextState.location.pathname }
    })
    callback();
	})
}

export default requireAuth;
