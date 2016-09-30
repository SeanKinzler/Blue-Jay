import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers/index.jsx';

const storeConfig = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		compose (
			applyMiddleware(ReduxPromise),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
}

export default storeConfig;