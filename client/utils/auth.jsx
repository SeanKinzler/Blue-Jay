import axios from 'axios';

const requireAuth = (nextState, replace, callback) => {
  axios.defaults.headers.common['jwt'] = localStorage.token;
  axios.post('/api/authenticated')
  .then((res) => {
    localStorage.username = res.data.username;
    localStorage.firstName = res.data.firstName;
    localStorage.lastName = res.data.lastName;
    callback();
  })
  .catch((err) => {
    localStorage.username = 'Suspicious user';
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
      // may be used for login redirect
      // query: { next: nextState.location.pathname }
    })
    callback();
  })
}

export default requireAuth;
