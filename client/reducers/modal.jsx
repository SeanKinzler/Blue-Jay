import { OPEN_MODAL, CLOSE_MODAL } from '../actions/index.jsx';

const initialState =  {
  selectedChannel: null,
  modalIsOpen: false
};

const Modal = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
    	return Object.assign({}, state, {
        modalIsOpen: true,
        selectedChannel: action.gif.selectedChannel   		
    	})
    case CLOSE_MODAL:
    	return Object.assign({}, state, {
        modalIsOpen: false,
        selectedChannel: action.gif.selectedChannel   		
    	})
    default:
      return state;
  }
}

export default Modal;