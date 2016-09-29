import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import Channel from './pages/Channel.jsx';
import Dashboard from './pages/Dashboard.jsx';
import configureStore from './store/storeConfig.jsx';

const store = configureStore();

render((
	<Provider store={store}>
	  <Router history={browserHistory}> 
	    <Route path='/' component={App}>
	      <IndexRoute component={Dashboard} />
	      <Route path='channel/:channelId' component={Channel} />
	    </Route>
	  </Router>
	</Provider>
  ), document.getElementById('App'));
