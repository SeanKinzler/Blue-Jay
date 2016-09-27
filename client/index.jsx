import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './components/App.jsx';
import Channel from './pages/Channel.jsx';
import Dashboard from './pages/Dashboard.jsx';
  
render((
  <Router history={browserHistory}> 
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='/channel' component={Channel} />
    </Route>
  </Router>
  ), document.getElementById('App'));
