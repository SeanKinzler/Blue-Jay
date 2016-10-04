import { OPEN_MODAL, CLOSE_MODAL } from '../actions/index.jsx';

const initialState =  {
  selectedStream: null,
  modalIsOpen: false
};

const Modal = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
    	return Object.assign({}, state, {
        modalIsOpen: true,
        selectedStream: action.stream.selectedStream  		
    	})
    case CLOSE_MODAL:
    	return Object.assign({}, state, {
        modalIsOpen: false,
        selectedStream: action.stream.selectedStream  		
    	})
    default:
      return state;
  }
}

export default Modal;