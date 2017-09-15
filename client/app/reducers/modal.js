import * as types from '../actions/actionTypes';

const initialState = {
  modalVisible: false
};

export default function toggle(state = initialState, action) {
  switch (action.type) {
    case types.SHOW:
      return {
        ...state,
        modalVisible: true,
        modalContent: action.content
      };
    case types.HIDE:
      return {
        ...state,
        modalVisible: false,
        modalContent: ''
      };
    default:
      return state;
  }
}
