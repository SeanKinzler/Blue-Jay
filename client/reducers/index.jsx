import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth.jsx';
import ChannelsReducer from './channels.jsx';
import ModalReducer from './modal.jsx';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  channels: ChannelsReducer,
  modal: ModalReducer
});

export default rootReducer;