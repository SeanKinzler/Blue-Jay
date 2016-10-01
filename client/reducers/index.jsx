import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth.jsx';
import ChannelsReducer from './channels.jsx';
import ModalReducer from './modal.jsx';
import VideoReducer from './video.jsx';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  channels: ChannelsReducer,
  modal: ModalReducer,
  video: VideoReducer
});

export default rootReducer;