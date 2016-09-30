import { createStore, compose } from 'redux';
import rootReducer from '../reducers/index.jsx';

const storeConfig = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		compose (
		  window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
}

export default storeConfig;