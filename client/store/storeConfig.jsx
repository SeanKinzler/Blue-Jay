import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.jsx';

const storeConfig = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		compose (
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
}

export default storeConfig;