import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth.jsx';
import StreamsReducer from './streams.jsx';
import ModalReducer from './modal.jsx';
import VideoReducer from './video.jsx';
import SubscriptionReducer from './subscriptions.jsx';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  streams: StreamsReducer,
  modal: ModalReducer,
  video: VideoReducer,
  subscriptions: SubscriptionReducer
});

export default rootReducer;