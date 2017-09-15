import * as types from './actionTypes';

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}

export function showModal(content) {
  return {
    type: types.SHOW,
    content
  };
}

export function hideModal() {
  return {
    type: types.HIDE,
    content: ''
  };
}
