import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import requireAuth from './utils/auth.jsx';
import App from './components/App.jsx';
import Home from './pages/Home.jsx';
import Channel from './pages/Channel.jsx';
import CreateStream from './pages/CreateStream.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserSignUp from './pages/UserSignUp.jsx';
import Login from './pages/Login.jsx'
import configureStore from './store/storeConfig.jsx';
import { persistStore } from 'redux-persist';
import Search from './pages/Search.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Subscriptions from './pages/Subscriptions.jsx';
import Streams from './pages/Streams.jsx';

const store = configureStore();
persistStore(store);

render((
  <Provider store={store}>
    <Router history={browserHistory}> 
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='dashboard' component={Dashboard} onEnter={requireAuth} />
        <Route path='search' component={Search} />
        <Route path=':channel' component={  } onEnter={requireAuth} />
        <Route path=':channel/:channelId' component={Channel} onEnter={requireAuth} />
        <Route path='subscriptions' component={Subscriptions} onEnter={requireAuth} />
        <Route path='streams' component={Streams} onEnter={requireAuth} />
        <Route path='create' component={CreateStream} onEnter={requireAuth} />
        <Route path='login' component={Login} />
        <Route path='signup' component={UserSignUp} />
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('App'));
