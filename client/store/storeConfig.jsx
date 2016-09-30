import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.jsx';
import { autoRehydrate } from 'redux-persist';

const storeConfig = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		compose(
			autoRehydrate(),
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
}

export default storeConfig;