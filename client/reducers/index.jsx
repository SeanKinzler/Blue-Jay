import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth.jsx';
import StreamsReducer from './streams.jsx';
import ModalReducer from './modal.jsx';
import VideoReducer from './video.jsx';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  streams: StreamsReducer,
  modal: ModalReducer,
  video: VideoReducer
});

export default rootReducer;