import { createStore } from 'redux';
import rootReducer from '../reducers/index.jsx';

const storeConfig = (initialState) => {
	return createStore(
		rootReducer,
		initialState
	)
}

export default storeConfig;